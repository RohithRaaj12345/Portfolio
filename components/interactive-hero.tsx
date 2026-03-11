"use client"

import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { ROLES } from "@/lib/constants"
import { useEffect, useState, useRef, useCallback } from "react"

interface PhysicsObject {
  id: string
  offsetX: number
  offsetY: number
  vx: number
  vy: number
  width: number
  height: number
  isDragging: boolean
  element: HTMLElement
}

interface VelocityTracker {
  x: number
  y: number
  time: number
}

export function InteractiveHeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [carromMode, setCarromMode] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const physicsObjects = useRef<PhysicsObject[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const dragInfo = useRef<{ id: string; startX: number; startY: number; velocityHistory: VelocityTracker[] } | null>(null)

  useEffect(() => {
    if (!carromMode) {
      const interval = setInterval(() => {
        setCurrentRole((prev) => (prev + 1) % ROLES.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [carromMode])

  const resetPositions = useCallback(() => {
    if (!carromMode) return
    
    physicsObjects.current.forEach((obj) => {
      obj.offsetX = 0
      obj.offsetY = 0
      obj.vx = 0
      obj.vy = 0
      obj.isDragging = false
      obj.element.style.transform = 'translate(0px, 0px)'
    })
    
    // Clear drag info
    dragInfo.current = null
  }, [carromMode])

  const initCarromMode = useCallback(() => {
    if (carromMode || !containerRef.current) return

    const container = containerRef.current
    const elements = container.querySelectorAll('[data-carrom]')

    physicsObjects.current = []

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const rect = htmlEl.getBoundingClientRect()
      const id = htmlEl.getAttribute('data-carrom') || ''

      physicsObjects.current.push({
        id,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
        width: rect.width,
        height: rect.height,
        isDragging: false,
        element: htmlEl
      })

      htmlEl.style.position = 'relative'
      htmlEl.style.zIndex = '200'
      htmlEl.style.transform = 'translate(0px, 0px)'
      htmlEl.style.transition = 'none' // Disable transition during physics
      htmlEl.style.willChange = 'transform' // Optimize for animations
    })

    setCarromMode(true)
    startPhysics()
  }, [carromMode])

  const startPhysics = useCallback(() => {
    const friction = 0.96 // Friction for smooth deceleration
    const restitution = 0.75 // Bounce coefficient

    const updatePhysics = () => {
      if (!containerRef.current) return

      const cardElement = containerRef.current.querySelector('.carrom-card') as HTMLElement
      if (!cardElement) return
      
      const cardRect = cardElement.getBoundingClientRect()

      physicsObjects.current.forEach((obj, i) => {
        if (obj.isDragging) return

        // Apply friction
        obj.vx *= friction
        obj.vy *= friction

        // Stop if velocity is very low
        if (Math.abs(obj.vx) < 0.05) obj.vx = 0
        if (Math.abs(obj.vy) < 0.05) obj.vy = 0

        // Update position
        obj.offsetX += obj.vx
        obj.offsetY += obj.vy

        // Get current element position
        const rect = obj.element.getBoundingClientRect()
        let currentX = rect.left - cardRect.left
        let currentY = rect.top - cardRect.top

        // Wall collisions - bounce back
        const minX = 0
        const maxX = cardRect.width - obj.width
        const minY = 0
        const maxY = cardRect.height - obj.height
        
        if (currentX <= minX) {
          obj.offsetX += (minX - currentX)
          obj.vx = Math.abs(obj.vx) * restitution
          currentX = minX
        }
        if (currentX >= maxX) {
          obj.offsetX -= (currentX - maxX)
          obj.vx = -Math.abs(obj.vx) * restitution
          currentX = maxX
        }
        if (currentY <= minY) {
          obj.offsetY += (minY - currentY)
          obj.vy = Math.abs(obj.vy) * restitution
          currentY = minY
        }
        if (currentY >= maxY) {
          obj.offsetY -= (currentY - maxY)
          obj.vy = -Math.abs(obj.vy) * restitution
          currentY = maxY
        }

        // Collision detection with other objects
        for (let j = i + 1; j < physicsObjects.current.length; j++) {
          const other = physicsObjects.current[j]
          if (other.isDragging) continue

          const otherRect = other.element.getBoundingClientRect()
          let otherX = otherRect.left - cardRect.left
          let otherY = otherRect.top - cardRect.top

          // Check for overlap
          if (
            currentX < otherX + other.width &&
            currentX + obj.width > otherX &&
            currentY < otherY + other.height &&
            currentY + obj.height > otherY
          ) {
            // Calculate centers
            const obj1CenterX = currentX + obj.width / 2
            const obj1CenterY = currentY + obj.height / 2
            const obj2CenterX = otherX + other.width / 2
            const obj2CenterY = otherY + other.height / 2

            const dx = obj2CenterX - obj1CenterX
            const dy = obj2CenterY - obj1CenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 0.1) continue

            // Normal vector
            const nx = dx / distance
            const ny = dy / distance

            // Relative velocity
            const dvx = obj.vx - other.vx
            const dvy = obj.vy - other.vy
            const dvn = dvx * nx + dvy * ny

            // Only resolve if objects are moving towards each other
            if (dvn > 0) {
              // Apply impulse (elastic collision)
              const impulse = dvn * 1.1
              obj.vx -= impulse * nx
              obj.vy -= impulse * ny
              other.vx += impulse * nx
              other.vy += impulse * ny

              // Separate overlapping objects
              const overlap = (obj.width + obj.height + other.width + other.height) / 4 - distance
              if (overlap > 0) {
                const separateX = nx * (overlap / 2 + 1)
                const separateY = ny * (overlap / 2 + 1)
                
                obj.offsetX -= separateX
                obj.offsetY -= separateY
                other.offsetX += separateX
                other.offsetY += separateY
                
                // Ensure both stay in bounds after separation
                const newObjRect = obj.element.getBoundingClientRect()
                const newObjX = newObjRect.left - cardRect.left
                const newObjY = newObjRect.top - cardRect.top
                
                if (newObjX < minX) obj.offsetX += (minX - newObjX)
                if (newObjX + obj.width > maxX) obj.offsetX -= (newObjX + obj.width - maxX)
                if (newObjY < minY) obj.offsetY += (minY - newObjY)
                if (newObjY + obj.height > maxY) obj.offsetY -= (newObjY + obj.height - maxY)
                
                const newOtherRect = other.element.getBoundingClientRect()
                const newOtherX = newOtherRect.left - cardRect.left
                const newOtherY = newOtherRect.top - cardRect.top
                
                if (newOtherX < minX) other.offsetX += (minX - newOtherX)
                if (newOtherX + other.width > maxX) other.offsetX -= (newOtherX + other.width - maxX)
                if (newOtherY < minY) other.offsetY += (minY - newOtherY)
                if (newOtherY + other.height > maxY) other.offsetY -= (newOtherY + other.height - maxY)
              }
            }
          }
        }

        obj.element.style.transform = `translate(${obj.offsetX}px, ${obj.offsetY}px)`
      })

      animationRef.current = requestAnimationFrame(updatePhysics)
    }

    animationRef.current = requestAnimationFrame(updatePhysics)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!carromMode) {
      initCarromMode()
      setTimeout(() => {
        startDragging(e, id)
      }, 50)
      return
    }

    startDragging(e, id)
  }, [carromMode, initCarromMode])

  const handleTouchStart = useCallback((e: React.TouchEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!carromMode) {
      initCarromMode()
      setTimeout(() => {
        startDraggingTouch(e, id)
      }, 50)
      return
    }

    startDraggingTouch(e, id)
  }, [carromMode, initCarromMode])

  const startDragging = (e: React.MouseEvent, id: string) => {
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    obj.isDragging = true
    obj.vx = 0
    obj.vy = 0

    dragInfo.current = {
      id,
      startX: e.clientX - obj.offsetX,
      startY: e.clientY - obj.offsetY,
      velocityHistory: [{ x: e.clientX, y: e.clientY, time: Date.now() }]
    }
  }

  const startDraggingTouch = (e: React.TouchEvent, id: string) => {
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    obj.isDragging = true
    obj.vx = 0
    obj.vy = 0

    const touch = e.touches[0]
    dragInfo.current = {
      id,
      startX: touch.clientX - obj.offsetX,
      startY: touch.clientY - obj.offsetY,
      velocityHistory: [{ x: touch.clientX, y: touch.clientY, time: Date.now() }]
    }
  }

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragInfo.current || !carromMode || !containerRef.current) return

    const { id, startX, startY, velocityHistory } = dragInfo.current
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    const cardElement = containerRef.current.querySelector('.carrom-card') as HTMLElement
    if (!cardElement) return
    
    const cardRect = cardElement.getBoundingClientRect()
    
    // Calculate desired new offset
    let newOffsetX = e.clientX - startX
    let newOffsetY = e.clientY - startY
    
    // Get element's base position (without offset)
    const tempTransform = obj.element.style.transform
    obj.element.style.transform = 'translate(0px, 0px)'
    const baseRect = obj.element.getBoundingClientRect()
    obj.element.style.transform = tempTransform
    
    // Calculate absolute position with new offset
    const newAbsX = baseRect.left - cardRect.left + newOffsetX
    const newAbsY = baseRect.top - cardRect.top + newOffsetY
    
    // Clamp to card boundaries
    const minX = 0
    const maxX = cardRect.width - obj.width
    const minY = 0
    const maxY = cardRect.height - obj.height
    
    const clampedAbsX = Math.max(minX, Math.min(maxX, newAbsX))
    const clampedAbsY = Math.max(minY, Math.min(maxY, newAbsY))
    
    // Calculate clamped offset
    newOffsetX = clampedAbsX - (baseRect.left - cardRect.left)
    newOffsetY = clampedAbsY - (baseRect.top - cardRect.top)
    
    obj.offsetX = newOffsetX
    obj.offsetY = newOffsetY
    
    // Push other objects away during drag
    const currentX = clampedAbsX
    const currentY = clampedAbsY
    
    physicsObjects.current.forEach((other) => {
      if (other.id === id || other.isDragging) return
      
      const otherRect = other.element.getBoundingClientRect()
      const otherX = otherRect.left - cardRect.left
      const otherY = otherRect.top - cardRect.top
      
      // Check collision
      if (
        currentX < otherX + other.width &&
        currentX + obj.width > otherX &&
        currentY < otherY + other.height &&
        currentY + obj.height > otherY
      ) {
        const obj1CenterX = currentX + obj.width / 2
        const obj1CenterY = currentY + obj.height / 2
        const obj2CenterX = otherX + other.width / 2
        const obj2CenterY = otherY + other.height / 2
        
        const dx = obj2CenterX - obj1CenterX
        const dy = obj2CenterY - obj1CenterY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          const nx = dx / distance
          const ny = dy / distance
          
          // Push with strong force
          const pushForce = 15
          other.vx = nx * pushForce
          other.vy = ny * pushForce
          
          // Separate immediately
          const overlap = (obj.width + obj.height + other.width + other.height) / 4 - distance
          if (overlap > 0) {
            other.offsetX += nx * (overlap + 2)
            other.offsetY += ny * (overlap + 2)
          }
        }
      }
    })
    
    obj.element.style.transform = `translate(${obj.offsetX}px, ${obj.offsetY}px)`

    // Track velocity history (keep last 5 positions)
    const currentTime = Date.now()
    velocityHistory.push({ x: e.clientX, y: e.clientY, time: currentTime })
    if (velocityHistory.length > 5) {
      velocityHistory.shift()
    }
    
    dragInfo.current = {
      ...dragInfo.current,
      velocityHistory
    }
  }, [carromMode])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!dragInfo.current || !carromMode) return

    const { id, velocityHistory } = dragInfo.current
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    obj.isDragging = false

    // Calculate velocity from history (use oldest and newest positions for better accuracy)
    if (velocityHistory.length >= 2) {
      const oldest = velocityHistory[0]
      const newest = velocityHistory[velocityHistory.length - 1]
      
      const timeDelta = Math.max(newest.time - oldest.time, 16)
      const deltaX = newest.x - oldest.x
      const deltaY = newest.y - oldest.y
      
      // Apply velocity with multiplier for flick effect
      const velocityMultiplier = 3.5
      obj.vx = (deltaX / timeDelta) * 1000 * velocityMultiplier / 60
      obj.vy = (deltaY / timeDelta) * 1000 * velocityMultiplier / 60

      // Cap maximum velocity
      const maxVelocity = 35
      const currentSpeed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy)
      if (currentSpeed > maxVelocity) {
        obj.vx = (obj.vx / currentSpeed) * maxVelocity
        obj.vy = (obj.vy / currentSpeed) * maxVelocity
      }
    }

    dragInfo.current = null
  }, [carromMode])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragInfo.current || !carromMode || !containerRef.current) return

    const touch = e.touches[0]
    const { id, startX, startY, velocityHistory } = dragInfo.current
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    const cardElement = containerRef.current.querySelector('.carrom-card') as HTMLElement
    if (!cardElement) return
    
    const cardRect = cardElement.getBoundingClientRect()
    
    // Calculate desired new offset
    let newOffsetX = touch.clientX - startX
    let newOffsetY = touch.clientY - startY
    
    // Get element's base position (without offset)
    const tempTransform = obj.element.style.transform
    obj.element.style.transform = 'translate(0px, 0px)'
    const baseRect = obj.element.getBoundingClientRect()
    obj.element.style.transform = tempTransform
    
    // Calculate absolute position with new offset
    const newAbsX = baseRect.left - cardRect.left + newOffsetX
    const newAbsY = baseRect.top - cardRect.top + newOffsetY
    
    // Clamp to card boundaries
    const minX = 0
    const maxX = cardRect.width - obj.width
    const minY = 0
    const maxY = cardRect.height - obj.height
    
    const clampedAbsX = Math.max(minX, Math.min(maxX, newAbsX))
    const clampedAbsY = Math.max(minY, Math.min(maxY, newAbsY))
    
    // Calculate clamped offset
    newOffsetX = clampedAbsX - (baseRect.left - cardRect.left)
    newOffsetY = clampedAbsY - (baseRect.top - cardRect.top)
    
    obj.offsetX = newOffsetX
    obj.offsetY = newOffsetY
    
    // Push other objects away during drag
    const currentX = clampedAbsX
    const currentY = clampedAbsY
    
    physicsObjects.current.forEach((other) => {
      if (other.id === id || other.isDragging) return
      
      const otherRect = other.element.getBoundingClientRect()
      const otherX = otherRect.left - cardRect.left
      const otherY = otherRect.top - cardRect.top
      
      // Check collision
      if (
        currentX < otherX + other.width &&
        currentX + obj.width > otherX &&
        currentY < otherY + other.height &&
        currentY + obj.height > otherY
      ) {
        const obj1CenterX = currentX + obj.width / 2
        const obj1CenterY = currentY + obj.height / 2
        const obj2CenterX = otherX + other.width / 2
        const obj2CenterY = otherY + other.height / 2
        
        const dx = obj2CenterX - obj1CenterX
        const dy = obj2CenterY - obj1CenterY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          const nx = dx / distance
          const ny = dy / distance
          
          // Push with strong force
          const pushForce = 15
          other.vx = nx * pushForce
          other.vy = ny * pushForce
          
          // Separate immediately
          const overlap = (obj.width + obj.height + other.width + other.height) / 4 - distance
          if (overlap > 0) {
            other.offsetX += nx * (overlap + 2)
            other.offsetY += ny * (overlap + 2)
          }
        }
      }
    })
    
    obj.element.style.transform = `translate(${obj.offsetX}px, ${obj.offsetY}px)`

    // Track velocity history (keep last 5 positions)
    const currentTime = Date.now()
    velocityHistory.push({ x: touch.clientX, y: touch.clientY, time: currentTime })
    if (velocityHistory.length > 5) {
      velocityHistory.shift()
    }
    
    dragInfo.current = {
      ...dragInfo.current,
      velocityHistory
    }
  }, [carromMode])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!dragInfo.current || !carromMode) return

    const { id, velocityHistory } = dragInfo.current
    const obj = physicsObjects.current.find(o => o.id === id)
    if (!obj) return

    obj.isDragging = false

    // Calculate velocity from history (use oldest and newest positions for better accuracy)
    if (velocityHistory.length >= 2) {
      const oldest = velocityHistory[0]
      const newest = velocityHistory[velocityHistory.length - 1]
      
      const timeDelta = Math.max(newest.time - oldest.time, 16)
      const deltaX = newest.x - oldest.x
      const deltaY = newest.y - oldest.y
      
      // Apply velocity with multiplier for flick effect
      const velocityMultiplier = 3.5
      obj.vx = (deltaX / timeDelta) * 1000 * velocityMultiplier / 60
      obj.vy = (deltaY / timeDelta) * 1000 * velocityMultiplier / 60

      // Cap maximum velocity
      const maxVelocity = 35
      const currentSpeed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy)
      if (currentSpeed > maxVelocity) {
        obj.vx = (obj.vx / currentSpeed) * maxVelocity
        obj.vy = (obj.vy / currentSpeed) * maxVelocity
      }
    }

    dragInfo.current = null
  }, [carromMode])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Auto-hide hint after 5 seconds on mobile
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showHint])

  const renderWords = (text: string, baseId: string) => {
    return text.split(' ').map((word, index) => (
      <span
        key={`${baseId}-${index}`}
        className="inline-block select-none"
        data-carrom={`${baseId}-word-${index}`}
        onMouseDown={(e) => handleMouseDown(e, `${baseId}-word-${index}`)}
        onTouchStart={(e) => handleTouchStart(e, `${baseId}-word-${index}`)}
        style={{ 
          cursor: 'grab', 
          marginRight: index < text.split(' ').length - 1 ? '0.25em' : '0',
          whiteSpace: 'nowrap',
          touchAction: 'none'
        }}
      >
        {word}
      </span>
    ))
  }

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Simple clean background */}
      <div className="absolute inset-0 bg-white" />

      {/* Carrom Area */}
      <div 
        ref={containerRef}
        className="relative z-10 flex-1 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full max-w-6xl bg-yellow-400 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 carrom-card relative">
          {/* Interactive Mode Indicator */}
          {carromMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 bg-black text-yellow-400 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg border-2 border-yellow-400 text-xs md:text-sm font-bold"
            >
              🎮 Interactive Mode
            </motion.div>
          )}
          
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 md:mb-6"
            >
              <span 
                className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-black text-yellow-400 text-xs md:text-sm font-bold rounded-md select-none"
                data-carrom="badge"
                onMouseDown={(e) => handleMouseDown(e, 'badge')}
                onTouchStart={(e) => handleTouchStart(e, 'badge')}
                style={{ cursor: 'grab', touchAction: 'none' }}
              >
                Available for Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mb-3 md:mb-5"
            >
              {renderWords('Rohith S', 'headline')}
            </motion.h1>

            <div className="h-12 md:h-16 mb-4 md:mb-6">
              <motion.p
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black"
              >
                {renderWords(ROLES[currentRole], 'role')}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-black max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium px-2"
            >
              {renderWords('Computer Science Engineering student with expertise in Flutter and Android development. Experienced in building mobile applications, cloud integration with AWS, and full-stack web solutions. Passionate about creating technology that solves real-world problems.', 'description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto"
            >
              <div 
                className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border-2 border-black hover:bg-black hover:text-yellow-400 transition-all select-none"
                data-carrom="stat1"
                onMouseDown={(e) => handleMouseDown(e, 'stat1')}
                onTouchStart={(e) => handleTouchStart(e, 'stat1')}
                style={{ cursor: 'grab', touchAction: 'none' }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-black mb-1">8.63</p>
                <p className="text-xs sm:text-sm font-bold">CGPA</p>
              </div>
              <div 
                className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border-2 border-black hover:bg-black hover:text-yellow-400 transition-all select-none"
                data-carrom="stat2"
                onMouseDown={(e) => handleMouseDown(e, 'stat2')}
                onTouchStart={(e) => handleTouchStart(e, 'stat2')}
                style={{ cursor: 'grab', touchAction: 'none' }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-black mb-1">5+</p>
                <p className="text-xs sm:text-sm font-bold">Projects</p>
              </div>
              <div 
                className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border-2 border-black hover:bg-black hover:text-yellow-400 transition-all select-none"
                data-carrom="stat3"
                onMouseDown={(e) => handleMouseDown(e, 'stat3')}
                onTouchStart={(e) => handleTouchStart(e, 'stat3')}
                style={{ cursor: 'grab', touchAction: 'none' }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-black mb-1">2nd</p>
                <p className="text-xs sm:text-sm font-bold">IEEE Hackathon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Hint - Desktop: always visible, Mobile: slide from right */}
      {!carromMode && (
        <>
          {/* Desktop Hint - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="hidden md:block absolute top-4 right-4 md:top-8 md:right-8 z-20"
          >
            <div className="bg-black text-yellow-400 px-4 py-3 md:px-5 md:py-3 rounded-xl border-2 border-yellow-400 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </motion.div>
                <p className="text-xs md:text-sm font-bold">Try dragging!</p>
              </div>
              <p className="text-xs text-yellow-400/80">Drag any text for fun!</p>
            </div>
          </motion.div>

          {/* Mobile: Arrow button to show hint */}
          <div className="md:hidden absolute top-1/2 right-0 -translate-y-1/2 z-20">
            {!showHint ? (
              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={() => setShowHint(true)}
                className="bg-black text-yellow-400 p-3 rounded-l-xl border-2 border-r-0 border-yellow-400 shadow-lg"
              >
                <motion.div
                  animate={{ x: [-3, 0, -3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-black text-yellow-400 px-4 py-3 rounded-l-xl border-2 border-r-0 border-yellow-400 shadow-lg max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </motion.div>
                  <p className="text-xs font-bold">Try dragging!</p>
                </div>
                <p className="text-xs text-yellow-400/80">Drag any text for fun!</p>
              </motion.div>
            )}
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="relative z-10 w-full pb-8 md:pb-10 lg:pb-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center items-center"
        >
          <button
            onClick={() => document.getElementById("challenge")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-6 md:px-7 py-2.5 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold shadow-md hover:shadow-lg transition-all border-2 border-black text-sm md:text-base"
          >
            Explore my journey
          </button>
          <button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className="w-full sm:w-auto px-6 md:px-7 py-2.5 md:py-3 bg-white text-black border-2 border-black rounded-lg font-bold hover:bg-black hover:text-yellow-400 transition-all text-sm md:text-base"
          >
            Download resume
          </button>
          {carromMode && (
            <button
              onClick={resetPositions}
              className="w-full sm:w-auto px-6 md:px-7 py-2.5 md:py-3 bg-white text-black border-2 border-black rounded-lg font-bold hover:bg-black hover:text-yellow-400 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
              title="Reset to default positions"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}

