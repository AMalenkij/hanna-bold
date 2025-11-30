# 🎸 HANNA — Official Website

<div align="start">

[![Website](https://img.shields.io/badge/Website-vyrij.org-blue?style=for-the-badge)](https://hanna.gdn)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>


**Hanna** is a rock band based in Gdańsk, Poland, with a Polish-Ukrainian lineup. This repository contains the source code for their official website.

🌐 **Live Site**: [hanna.gdn](https://hanna.gdn)

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


## 🗄️ Data Structure (Prisma / MongoDB)

### Concert (concerts)

```typescript
Concert {
  id: string          // ObjectId
  title: string       // Concert title
  date: DateTime      // Date and time
  city: string        // City (e.g., "Gdańsk")
  venueName: string   // Venue name (e.g., "Plama GAK")
  address: string     // Full address
  link?: string       // Optional link (e.g., for tickets)
  isPublished: boolean // Publication status
}
```

### Posts (posts)

```typescript
Posts {
  id: string          // ObjectId
  // Multilingual Titles
  title_en: string
  title_ua: string
  title_pl: string
  // Multilingual Intros
  intro_en: string
  intro_ua: string
  intro_pl: string
  // Multilingual Content (Rich Text / HTML)
  content_en: string
  content_ua: string
  content_pl: string
  // Metadata
  slug: string        // Unique URL identifier
  photo: string       // Cover image URL
  is_published: boolean
  created_at: DateTime
  Gallery: Gallery[]  // Relation to Gallery images
}
```

### Video (video)

```typescript
Video {
  id: string          // ObjectId
  link: string        // YouTube/Vimeo link
  title: string       // Video title
  description_ua: string
  description_en: string
  description_pl: string
  createdAt: DateTime
}
```

### Gallery (gallery)

```typescript
Gallery {
  id: string          // ObjectId
  publicId: string    // Cloudinary public_id
  postId?: string     // Relation to Posts (optional)
  createdAt: DateTime
}
```

### Entity Relationships

-   `Posts` can have multiple `Gallery` items (one-to-many).
## 📝 License

This project is private and belongs to the band HANNA.

---

## 🚢 Deployment

The project is optimized for deployment on **[Vercel](https://vercel.com/)**:

1.  Connect the repository to Vercel
2.  Add environment variables
3.  Vercel will automatically build and deploy the project

## 🙏 Acknowledgments

Special thanks to:

-   **Hanna** band members — for inspiration and support

---

<div align="center">

**Made with ❤️ and Rock 'n' Roll 🤘**

</div>

