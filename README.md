# Portfolio Terminal

A modern, interactive portfolio website with a terminal theme built using Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🖥️ **Terminal Interface**: Authentic terminal experience with command history and navigation
- 🎨 **Theme Customization**: Switch between dark/light modes and multiple accent colors
- 🎭 **Interactive Profile Card**: 3D tilt effect with dynamic gradients
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion

## Available Commands

- `help` - Show available commands
- `about` - Learn about Deffry Abhirama Putra
- `skills` - View technical skills
- `projects` - See featured projects
- `contact` - Get contact information
- `cv` - Download resume
- `clear` - Clear terminal
- `dark` / `light` - Switch theme mode
- `green` / `orange` / `white` - Change accent color
- `exit` - Return to portfolio

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-terminal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS, Autoprefixer

## Project Structure

```
portfolio-terminal/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ProfileCard.tsx
│   └── PortfolioTerminal.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Customization

### Personal Information
Update the personal information in `components/PortfolioTerminal.tsx`:
- Name, title, and avatar
- Contact information
- Skills and projects
- Location and experience

### Themes
The terminal supports multiple themes with different color schemes. You can modify the `themes` object in `PortfolioTerminal.tsx` to add new color combinations.

### Styling
Customize the appearance by modifying:
- `app/globals.css` for global styles and animations
- `tailwind.config.ts` for Tailwind configuration
- Component-specific styles in each component file

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project for production:
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Created by Deffry Abhirama Putra - Full-Stack Developer 