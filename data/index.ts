import { Github, Linkedin, Twitter } from "lucide-react";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
  // { name: "Old Version", link: "https://theravindrachoudhary.vercel.app/" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/ravindra_profile.png",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title:
      "Currently building a Complete Pharma Managemnt System using Next.js and Tailwind CSS",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Pharma Student Management Platform",
    des: "Engineered a Next.js 14 project for Pharma Students and Conferences Registration. This platform ensures secure authentication, real-time updates, and responsiveness. Integrated payment gateways facilitate smooth transactions, offering an efficient solution for both students and conference organizers. Explore the firsthand experience through the project link.",
    img: "/Proj4.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://operantpharmacy.vercel.app/",
  },
  {
    id: 2,
    title: "Event Management",
    des: "Event Management Tools Used: Clerk Authentication, ShadCN UI, and Stripe Payment Gateway. With this application, organizations can create events, and users have the option to join these events, which may have optional prices.",
    img: "/Proj2.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://operant-evently.vercel.app/",
  },
  {
    id: 3,
    title: "NextGen Magzine",
    des: "Developed an Magzine website platform using Next.js 14, enabling users to browse magzines, add them to their cart, and complete transactions. Integrated Rozerpay payment gateway for secure and seamless transactions, ensuring a user-friendly PDF reading experience.",
    img: "/Proj3.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg"],
    link: "https://www.nextgenleaders.vip/",
  },
  {
    id: 4,
    title: "Operant BioMedical Federation",
    des: "Designed and developed a responsive website for Operant BioMedical Federation using Next.js 14, showcasing the federation's mission, vision, and services. The website features a clean and modern design, providing an interactive and engaging user experience.",
    img: "/Proj1.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://operant-biomedical.vercel.app/",
  },
  {
    id: 5,
    title: "APTICON 2024",
    des: "Developed a website for APTICON 2024 using Next.js 14, showcasing the conference's schedule, speakers, and sponsors. The website features a clean and modern design, providing an interactive and engaging user experience.",
    img: "/apti.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://apticon2024.com",
  },
  {
    id: 6,
    title: "Pharmanecia 4.E",
    des: "Developed a website for Pharmanecia 4.E using Next.js 14, showcasing the conference's schedule, speakers, and sponsors. The website features a clean and modern design, providing an interactive and engaging user experience.",
    img: "/pharmanecia.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://pharmanecia.org",
  },
  {
    id: 7,
    title: "Lift - Car Pooling App",
    des: "A real-time car pooling web application built with Next.js 14, integrating Mapbox for live location tracking and real-time chat. Users can offer or request rides, enhancing convenience and sustainability.",
    img: "/p5.png",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/mapbox.svg",
      "/socket.svg",
    ],
    link: "https://lift-coral.vercel.app/",
  },
  {
    id: 8,
    title: "Comfort Stay PG Management",
    des: "A complete PG management system with multi-role login, an advanced admin dashboard, and integrated AI tools for automation. Designed for both PG owners and tenants to simplify operations and communication.",
    img: "/comfort.png",
    iconLists: [
      "/next.svg",
      "/tail.svg",
      "/ts.svg",
      "/ai.svg",
      "/dashboard.svg",
    ],
    link: "https://comfortstaypg.com/",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Ravindra was a game-changer for our conference registration system. His understanding of scalable web solutions and eye for detail made the process seamless. Highly recommend him for any tech-driven initiative.",
    name: "Dr. Anjali Mehta",
    title: "Professor, Bombay College of Pharmacy",
  },
  {
    quote:
      "Ravindra brought a lot of innovative ideas to our PG management platform. From user flow to admin dashboards, he handled everything with clarity and confidence. Truly professional!",
    name: "Dilip Sirvi",
    title: "Founder, ComfortStay PG Services",
  },
  {
    quote:
      "Our collaboration with Ravindra for the Lift carpooling platform was fantastic. His expertise in real-time systems and Mapbox integration delivered exactly what we envisioned.",
    name: "Suresh Nair",
    title: "Product Manager, Lift Mobility",
  },
  {
    quote:
      "Ravindra is one of the most dedicated developers I've worked with. His ability to take ownership and deliver under tight deadlines was impressive. His work speaks volumes.",
    name: "Neha Kapoor",
    title: "Operations Head, NextGen Leaders",
  },
  {
    quote:
      "Ravindra understood our requirements for the conference site better than we did ourselves. His technical proficiency and creative input made the website a huge success.",
    name: "Dr. Mihir kar",
    title: "Convener, APTICON 2024",
  },
];

export const companies = [
  {
    id: 1,
    name: "nextGEN LEADERS",
    img: "/nextgen.png",
    nameImg: "/NEXTGEN.svg",
  },
  {
    id: 2,
    name: "apticon",
    img: "/APTICON.png",
    nameImg: "/APTICON.svg",
  },
  {
    id: 3,
    name: "operant",
    img: "/operant.png",
    nameImg: "/OPERANT.svg",
  },
  {
    id: 4,
    name: "gbpcg",
    img: "/GBPCG.png",
    nameImg: "/GLOBAL_BIO.svg",
  },
  {
    id: 5,
    name: "econsys",
    img: "/econsys.png",
    nameImg: "/Econsys.svg",
  },
  {
    id: 6,
    name: "Just be Flex.",
    img: "/jbf.png",
    nameImg: "/justbeflex.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Angular Developer",
    desc: "Developed a high-performance PWA with push notifications and complex dynamic forms. Built a reusable frontend framework to accelerate development.",
    thumbnail: "/api/placeholder/400/200",
    company: "Viklele Consulting",
    duration: "Dec 2024 - Present",
  },
  {
    id: 2,
    title: "Software Engineer",
    desc: "Built a pharma research platform in Next.js with secure authentication, payment integration, and advanced user profile features. Managed full project lifecycle.",
    thumbnail: "/api/placeholder/400/200",
    company: "Operant Federation",
    duration: "Jun 2023 - Nov 2024",
  },
  {
    id: 3,
    title: "Solution Developer",
    desc: "Developed a risk management system using ASP.NET Core and Angular. Designed REST APIs and improved data workflows through dynamic forms.",
    thumbnail: "/api/placeholder/400/200",
    company: "Quadwave Consulting",
    duration: "Apr 2022 - May 2023",
  },
];

export const skills = [
  { name: "Angular", level: 95 },
  { name: "Next.js / React", level: 90 },
  { name: "TypeScript / JavaScript", level: 90 },
  { name: ".NET Core", level: 85 },
  { name: "GraphQL", level: 80 },
  { name: "REST API Design", level: 88 },
  { name: "PWA & Push Notifications", level: 85 },
  { name: "MySQL", level: 80 },
  { name: "Agile / Git / CI-CD", level: 82 },
];

export const socialMedia = [
  { id: 1, url: "https://github.com/ravindrasirvi609", icon: Github },
  { id: 2, url: "https://x.com/ravindra_sirvi", icon: Twitter },
  { id: 3, url: "https://www.linkedin.com/in/ravindra-sirvi/", icon: Linkedin },
];
