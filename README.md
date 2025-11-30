# 🎸 HANNA — Official Website

<div align="start">

[![Website](https://img.shields.io/badge/Website-vyrij.org-blue?style=for-the-badge)](https://hanna.gdn)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

**Hanna** is a rock band based in Gdańsk, Poland, with a Polish-Ukrainian lineup. This repository contains the source code for their official website.

🌐 **Live Site**: [Hanna.gdn](https://hanna.gdn)

###  About the Project

This is a modern, dynamic web application built with **Next.js 15** and **React 19**, designed to showcase the band's music, news, and events. It features a responsive design, smooth animations, and a content management system integration.

### 🛠 Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
-   **Animations:** [Motion](https://motion.dev/) & [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
-   **Database & ORM:** [Prisma](https://www.prisma.io/)
-   **Authentication:** [Clerk](https://clerk.com/)
-   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
-   **CMS / Rich Text:** Tiptap
-   **Media:** Cloudinary
-   **Linting & Formatting:** [Biome](https://biomejs.dev/)

## 🌍 Multi-language Support

The site supports three languages:

- 🇺🇦 **Ukrainian** (ua) — primary language
- 🇬🇧 **English** (en)
- 🇵🇱 **Polish** (pl)

Translations are located in the `messages/` folder:
- `messages/ua.json`
- `messages/en.json`
- `messages/pl.json`
---

## 🎨 Design Features

- **Responsive Design** — optimized for all devices
- **Dark Theme** — support via `next-themes`
- **Smooth Animations** — using Motion (Framer Motion)
- **Image Optimization** — automatic optimization via Next.js Image
- **Gallery** — interactive
- **Carousel** — smooth event carousel
---

## � Project Structure

```
hanna-bold/
├── actions/              # Server actions
├── app/                  # Next.js App Router
│   └── [locale]/         # Internationalized routes
├── components/           # React components
├── constants/            # Global constants
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization setup
├── lib/                  # Utility libraries
├── messages/             # Translation files
├── prisma/               # Database schema and migrations
├── providers/            # Context providers
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 📝 License

This project is private and belongs to the band HANNA.

---
