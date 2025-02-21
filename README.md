# AI Business Consulting Website

A modern, professional website for AI consulting services, featuring Atlas - an AI consultant specializing in helping businesses implement AI solutions. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🤖 Interactive AI Consultant (Atlas) with real-time chat
- 🎨 Modern, dark-mode design with smooth animations
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js
- 🎯 SEO optimized
- 🔥 Interactive UI elements
- 📝 Contact form with validation
- 🚀 Deployed on Vercel

## Live Demo

Visit the live site: [Your-Vercel-URL]

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI API
- React Markdown
- React Intersection Observer
- Heroicons

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Create a Vercel account at vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Set up environment variables in Vercel dashboard:
   - OPENAI_API_KEY
   - NEXT_PUBLIC_OPENAI_API_KEY

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   └── page.tsx     # Main page
├── components/       # React components
├── styles/          # Global styles
└── lib/             # Utility functions
```

## Features in Detail

### Atlas AI Consultant
- Real-time chat interface
- OpenAI integration
- Business-focused responses
- Rate limiting for API calls

### Contact Form
- Form validation
- Error handling
- Success notifications
- Rate limiting protection

## Customization

- Update the content in `src/lib/constants.ts`
- Modify the color scheme in `tailwind.config.ts`
- Add your own images and assets in the `public` directory
- Customize animations in the component files

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT 