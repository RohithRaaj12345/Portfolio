# Rohith S - Developer Portfolio

A modern, production-ready developer portfolio built with Next.js 16, featuring an interactive hero section with physics-based animations and a clean, bold design.

## ✨ Features

- **Interactive Hero**: Drag-and-drop physics simulation with carrom-style interactions
- **Bold Design**: Yellow and black theme with strong borders and playful aesthetics
- **Smooth Animations**: Framer Motion powered entrance and hover effects
- **Time Machine Journey**: Visual timeline of developer evolution
- **Project Showcase**: Detailed project cards with architecture diagrams
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized build with minimal dependencies
- **SEO Ready**: Complete metadata and semantic HTML

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Runtime**: React 19

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RohithRaaj12345/portfolio.git
cd rohith-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
rohith-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Page sections
│   │   ├── challenge-section.tsx
│   │   ├── projects.tsx
│   │   ├── experience.tsx
│   │   ├── achievements.tsx
│   │   └── contact.tsx
│   ├── interactive-hero.tsx
│   └── time-machine-portfolio.tsx
├── lib/
│   ├── constants.ts        # Site configuration and data
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
    ├── resume.pdf
    └── robots.txt
```

## 🎨 Customization

### Update Personal Information

Edit `lib/constants.ts` to update:
- Personal details (name, roles, contact info)
- Projects and achievements
- Experience and education
- Social media links

### Add Projects

Add new projects to the `PROJECTS` array in `lib/constants.ts`:

```typescript
{
  id: "project-id",
  title: "Project Name",
  description: "Project description",
  tech: ["Tech1", "Tech2"],
  architecture: "Architecture diagram",
  problem: "Problem solved",
  github: "https://github.com/...",
  website: "https://...",
  period: "Month Year",
  type: "Project Type"
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## ⚡ Performance

- Optimized bundle size (removed unused dependencies)
- Code splitting with dynamic imports
- Lazy loading for sections
- Minimal dependencies (only 7 production packages)
- Fast build times with Turbopack

## 🔍 SEO

- Complete metadata in layout.tsx
- Semantic HTML structure
- Open Graph tags
- Twitter Card tags
- Sitemap.xml included
- Robots.txt configured

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 📧 Contact

- **Email**: rohithsendilkumar2005@gmail.com
- **GitHub**: [@RohithRaaj12345](https://github.com/RohithRaaj12345)
- **LinkedIn**: [Rohith S](https://linkedin.com/in/rohith-sendilkumar/)
- **Phone**: +91 8838843746

---

Built with ❤️ using Next.js, React, and Tailwind CSS
