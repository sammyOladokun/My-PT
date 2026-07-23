export const projects = [
  {
    title: "Nike Reimagined | Modern Redesign Concept",
    slug: "nike-reimagined",
    accent: "#22d3ee",
    tagline:
      "A sleek and modern redesign of Nike’s official web experience built with React and Tailwind CSS.",
    overview:
      "Nike Reimagined is a creative redesign project focused on delivering a refined, high-performance web experience inspired by Nike’s global brand identity. It highlights a clean, minimal UI with smooth transitions, responsive layouts, and optimized performance across devices. The project demonstrates a balance of aesthetics and functionality for a real-world eCommerce feel.",
    features: [
      "Minimalist and modern user interface design",
      "Fully responsive layouts optimized for all devices",
      "Smooth page transitions and animations with Framer Motion",
      "Optimized build process with Vite for fast loading",
      "Deployed on Vercel for production-grade performance",
    ],
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Vercel",
    ],
    challenges: [
      "Maintaining brand consistency while reimagining Nike’s design language.",
      "Achieving smooth animations without affecting performance.",
      "Ensuring pixel-perfect responsiveness across devices.",
      "Optimizing load times for a better user experience.",
    ],
    learnings: [
      "Mastered efficient UI composition with React and Tailwind CSS.",
      "Improved understanding of animation principles using Framer Motion.",
      "Enhanced deployment workflow using Vercel and Vite integration.",
      "Developed better practices for responsive and scalable frontend design.",
    ],
    feedback: false,
    links: {
      live: "https://nike-reimagined-sooty.vercel.app",
      github: "https://github.com/sammyOladokun/Nike-reimagined",
    },
  },

  {
    title: "Portfolio | Samuel Oladokun",
    slug: "portfolio",
    accent: "#a855f7",
    tagline:
      "A dynamic portfolio showcasing my projects, skills, and contributions using the latest web technologies.",
    overview:
      "My personal portfolio is built to highlight my journey as a developer. It integrates advanced features like profile views tracking, a love count mechanism, and server-side actions for seamless interactivity and performance.",
    features: [
      "API to track and display profile views in real-time.",
      "Love count feature to allow visitors to express appreciation for the work.",
      "Implemented server actions using the latest Next.js features.",
      "Dynamic project listing with slug-based routing for detailed pages.",
      "Mobile-responsive and optimized for all devices.",
      "Integration with MongoDB using Mongoose for efficient data management.",
    ],
    techStack: [
      "Next.js",
      "SadCn/UI",
      "MongoDB",
      "Tailwind CSS",
      "Radix UI",
      "TypeScript",
    ],
    challenges: [
      "Implementing real-time tracking for profile views efficiently.",
      "Designing and integrating a scalable database schema with Mongoose.",
      "Utilizing server actions for seamless and performant interactions.",
      "Ensuring cross-browser and device compatibility for UI components.",
    ],
    learnings: [
      "Deepened knowledge of Next.js server actions and their use cases.",
      "Gained experience in designing interactive UI components.",
      "Enhanced understanding of MongoDB operations and ORM with Mongoose.",
      "Improved ability to optimize performance for web applications.",
    ],
    feedback: true,
    links: {
      live: "https://sammyoladokun.github.io",
      github: "https://topmate.io/samueloladokun90/1773422",
    },
  },
  {
    title: "Photography Booking Website | Seamless Session Booking",
    slug: "photography-booking-site",
    aliases: ["news-hub"],
    accent: "#f472b6",
    tagline:
      "A clean photography booking website for showcasing services and booking sessions online.",
    overview:
      "The photography booking website is a responsive platform that helps visitors explore photography services and book sessions with ease. It focuses on a polished user experience, smooth navigation, and clear presentation of booking details, making it easy for clients to view offerings and schedule appointments online.",
    features: [
      "Service-focused layout for presenting photography offerings clearly.",
      "Online booking flow designed for a smooth user experience.",
      "Responsive design that works well across desktop and mobile devices.",
      "Clean, polished interface with an emphasis on visual storytelling.",
      "Built for fast access to booking and contact information.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "shadcn-ui",
    ],
    challenges: [
      "Creating a booking experience that feels simple and intuitive.",
      "Balancing a visually rich design with fast, responsive performance.",
      "Structuring content so service details and booking actions stay clear.",
      "Ensuring the layout remains polished across all screen sizes.",
    ],
    learnings: [
      "Improved skill in designing conversion-focused booking interfaces.",
      "Enhanced understanding of responsive UI composition for service sites.",
      "Strengthened frontend structuring with reusable React components.",
      "Gained better experience with clean, accessible presentation of content.",
    ],
    feedback: true,
    links: {
      live: "https://photography-bookingsite.onrender.com/",
      github: "https://github.com/sammyOladokun/photography-booking-site",
    },
  },
  {
    title: "Jewelry Store | Elegant E-Commerce Experience",
    slug: "freshmart-store",
    accent: "#f59e0b",
    tagline:
      "A polished jewelry store website designed to showcase products with a refined shopping experience.",
    overview:
      "The jewelry store project is a sleek and responsive e-commerce experience built to present rings, necklaces, earrings, and other pieces in a luxurious way. It emphasizes elegant product presentation, intuitive navigation, and a smooth browsing flow so customers can explore items and move toward purchase with ease.",
    features: [
      "Elegant product showcase layout with a premium visual feel.",
      "Responsive design optimized for desktop and mobile shoppers.",
      "Smooth browsing experience for exploring products and collections.",
      "Clean interface focused on clarity, styling, and usability.",
      "Built to support a polished online shopping journey.",
    ],
    techStack: [
      "React",
      "Vite",
      "Redux",
      "Tailwind CSS",
    ],
    challenges: [
      "Creating a luxury-inspired layout without sacrificing usability.",
      "Keeping product presentation visually balanced across devices.",
      "Maintaining smooth navigation while showcasing detailed items.",
      "Structuring the storefront for a clean shopping experience.",
    ],
    learnings: [
      "Improved skills in designing premium-looking e-commerce interfaces.",
      "Enhanced understanding of responsive product presentation.",
      "Learned how to balance visual elegance with functional navigation.",
      "Gained experience building scalable storefront-style frontend layouts.",
    ],
    feedback: true,
    links: {
      live: "https://peacejewel.onrender.com/",
      github: "https://github.com/sammyOladokun/peaceJewel",
    },
  },
  {
    title: "GitHub Profile Viewer | Instant GitHub Insights",
    slug: "github-profile-viewer",
    accent: "#ec4899",
    tagline:
      "An interactive web app to instantly view GitHub profiles with clean UI built using HTML, CSS, and JavaScript.",
    overview:
      "GitHub Profile Viewer allows users to instantly fetch and view detailed GitHub profiles using the GitHub REST API. The app displays essential user information including profile picture, name, bio, followers, repositories, and more. With a responsive and minimalist interface, it offers a smooth experience for exploring any GitHub account directly from the browser.",
    features: [
      "Instantly search and view any GitHub user's profile.",
      "Displays profile picture, username, bio, followers, and repositories.",
      "Responsive and clean user interface for better readability.",
      "Utilizes GitHub REST API for fetching real-time profile data.",
      "Lightweight structure ensuring fast performance and accessibility.",
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "GitHub API",
    ],
    challenges: [
      "Fetching and managing API data efficiently with JavaScript.",
      "Designing a clean, minimal, and responsive interface.",
      "Handling errors for invalid or non-existent GitHub users.",
      "Ensuring smooth and fast data rendering without frameworks.",
    ],
    learnings: [
      "Strengthened understanding of API integration using JavaScript.",
      "Improved skills in building responsive layouts with pure CSS.",
      "Learned effective DOM manipulation and async handling.",
      "Enhanced ability to design lightweight, framework-free web apps.",
    ],
    feedback: true,
    links: {
      live: "https://sammyoladokun.github.io/GitHub-Profile-Viewer/",
      github: "https://github.com/sammyOladokun/GitHub-Profile-Viewer",
    },
  },
];
