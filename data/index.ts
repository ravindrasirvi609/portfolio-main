import { Github, Linkedin, Twitter } from "lucide-react";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Products", link: "#products" },
  { name: "Case Studies", link: "#case-studies" },
  { name: "Tech Stack", link: "#tech-stack" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const heroData = {
  title: "Building Smart Digital Systems for Real Businesses",
  subtitle: "We engineer scalable, high-performance web and mobile solutions tailored to solve complex business challenges.",
};

export const aboutData = {
  role: "Digital Systems Architect & Product Engineer",
  story: "I am Ravindra Choudhary, a Digital Systems Architect obsessed with transforming complex problems into elegant, high-impact digital products. I don't just write code; I design intelligent, scalable systems that drive real-world business value. From conceptualization to deployment, my focus is unwavering: delivering premium, robust, and intuitive solutions that empower modern businesses to scale securely and efficiently.",
};

export const products = [
  {
    id: "stay-smart",
    title: "PG Management Software – 'Stay Smart'",
    tagline: "Smart PG Management for Modern Living",
    clients: ["Comfort Stay PG", "Sunrise PG", "Aithi PG"],
    description: "A comprehensive SaaS platform revolutionizing completely how PG accommodations are managed. Designed for efficiency, transparency, and seamless tenant experiences.",
    features: ["Advanced Room Management", "Automated Rent Tracking", "Tenant KYC & Management", "Predictive Analytics"],
    img: "/comfort.png", // Reusing existing image, might need a better one
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/dashboard.svg", "/ai.svg"],
    link: "https://comfortstaypg.com/",
  },
  {
    id: "conference-system",
    title: "Conference Management System",
    tagline: "Scalable Academic & Corporate Event Infrastructure",
    clients: ["JSS Ooty", "Nirma University", "Chips College Guntur"],
    description: "An enterprise-grade event management solution engineered to handle high-volume registrations, complex abstract submissions, and robust administrative control.",
    features: ["Dynamic Registration Workflows", "Intelligent Abstract Management", "Integrated Payment Tracking", "Real-Time Event Analytics", "Custom Admin Control Panel"],
    img: "/apti.png", // Reusing APTICON image as an example
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://apticon2024.com",
  },
  {
    id: "mmart",
    title: "Online Shopping Web App",
    tagline: "Digital Solutions for Local Retailers",
    clients: ["MMart"],
    description: "A high-performance e-commerce engine enabling local businesses to digitize their inventory and scale their operations with a premium, mobile-first shopping experience.",
    features: ["Intuitive Store Dashboard", "Seamless Order Management", "Real-Time Inventory Control", "Optimized Mobile Experience", "Integrated Delivery Logistics"],
    img: "/Proj2.png", // Need relevant image
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "#", // Add link if available
  }
];

export const caseStudies = [
  {
    id: 1,
    title: "Revolutionizing PG Operations",
    product: "PG Management Software",
    problem: "Manual rent collection, tracking tenant data on spreadsheets, and mismanaged room allocations led to revenue leakage and operational chaos for mid-sized PG owners.",
    solution: "Deployed the 'Stay Smart' platform with automated invoicing, real-time room availability mapping, and a tenant self-service portal.",
    result: "30% increase in operational efficiency, zero rent discrepancies, and significantly improved tenant satisfaction.",
    metrics: [
      { label: "Efficiency Gain", value: "30%" },
      { label: "Error Rate", value: "0%" },
      { label: "Active Users", value: "5K+" }
    ],
    image: "/comfort.png"
  },
  {
    id: 2,
    title: "Scaling Academic Conferences",
    product: "Conference Management System",
    problem: "Universities struggled with managing thousands of registrations, varying payment tiers, and complex abstract review processes using fragmented legacy systems.",
    solution: "Engineered a unified ecosystem integrating seamless payment gateways, dynamic abstract submission forms, and a comprehensive admin dashboard for complete oversight.",
    result: "Successfully managed 10,000+ abstract submissions across multiple conferences with 100% platform uptime.",
    metrics: [
      { label: "Registrations", value: "10K+" },
      { label: "Platform Uptime", value: "100%" },
      { label: "Processing Speed", value: "<1s" }
    ],
    image: "/apti.png"
  },
  {
    id: 3,
    title: "Digitizing Local Retail",
    product: "Online Shopping Web App",
    problem: "Local shopkeepers lacked the technical infrastructure to manage digital inventory, process online orders, and compete with larger e-commerce platforms.",
    solution: "Delivered a mobile-first e-commerce engine with an intuitive vendor dashboard, real-time inventory sync, and a simplified order fulfillment workflow.",
    result: "Enabled stores to go digital within days, seeing a 40% jump in order volume through the new online channel.",
    metrics: [
      { label: "Order Volume", value: "+40%" },
      { label: "Onboarding Time", value: "<48h" },
      { label: "Delivery Efficiency", value: "+25%" }
    ],
    image: "/Proj3.png"
  }
];

export const techStack = [
  { name: "Next.js", icon: "/next.svg", category: "Frontend Engine" },
  { name: "TypeScript", icon: "/ts.svg", category: "Type Safety" },
  { name: "Tailwind CSS", icon: "/tail.svg", category: "Styling" },
  { name: "Framer Motion", icon: "/fm.svg", category: "Animations" },
  { name: ".NET Core", icon: "/net.svg", category: "Backend Microservices" }, // Ensure /net.svg exists or use an alternative
  { name: "FastAPI", icon: "/api.svg", category: "High-Perf APIs" }, // Ensure /api.svg exists
  { name: "Azure", icon: "/azure.svg", category: "Cloud Infrastructure" } // Ensure /azure.svg exists
];


export const testimonials = [
  {
    quote:
      "Ravindra engineered a digital infrastructure for our PG network that completely removed the administrative bottleneck. The dashboard is incredibly intuitive, and our operations have never been smoother. He builds serious systems.",
    name: "Dilip Sirvi",
    title: "Founder, ComfortStay PG Services",
  },
  {
    quote:
      "Working with Ravindra was a paradigm shift for our conference registration system. His understanding of scalable architecture and his ability to handle complex payment workflows is unmatched. Highly recommended for any serious academic or corporate event platform.",
    name: "Dr. Anjali Mehta",
    title: "Professor, Bombay College of Pharmacy",
  },
  {
    quote:
      "We needed a robust digital storefront that could handle our local retail operations efficiently. Ravindra delivered a solution that not only looks premium but is incredibly powerful under the hood. It transformed how we do business.",
    name: "Owner",
    title: "MMart Retail",
  },
];

export const companies = [
  { id: 1, name: "Comfort Stay PG", img: "/comfort.png", nameImg: "/comfort.png" },
  { id: 2, name: "JSS Ooty", img: "/nextgen.png", nameImg: "/NEXTGEN.svg" },
  { id: 3, name: "Nirma University", img: "/APTICON.png", nameImg: "/APTICON.svg" },
  { id: 4, name: "MMart", img: "/operant.png", nameImg: "/OPERANT.svg" },
];

export const socialMedia = [
  { id: 1, url: "https://github.com/ravindrasirvi609", icon: Github },
  { id: 2, url: "https://x.com/ravindra_sirvi", icon: Twitter },
  { id: 3, url: "https://www.linkedin.com/in/ravindra-sirvi/", icon: Linkedin },
];
