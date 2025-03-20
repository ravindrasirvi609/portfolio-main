import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  // Check if current path is Hindi version
  const isHindi = pathname === "/hi";

  return (
    <footer className="relative z-[100]" id="Contact">
      <div className="w-full flex flex-col py-10 px-4 md:px-10 gap-10 sm:gap-20">
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-3xl">Ravindra Sirvi</p>
            <p className="text-gray-400">
              {isHindi ? "वेबसाइट और ऐप डेवलपर" : "Web & App Developer"}
            </p>
            <p className="text-gray-400">{isHindi ? "भारत" : "India"}</p>
            <div className="flex gap-2 mt-2">
              <Link
                href={isHindi ? "/" : "/hi"}
                className="px-3 py-1 border border-gray-600 rounded-md text-sm hover:bg-gray-800 transition-all"
              >
                {isHindi ? "English" : "हिंदी"}
              </Link>
            </div>
          </div>
          <div className="flex gap-10 sm:gap-20 flex-wrap">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{isHindi ? "सोशल" : "Socials"}</p>
              <Link
                href={"https://github.com/ravindrasirvi609"}
                className="text-gray-400 hover:text-white"
                target="_blank"
              >
                GitHub
              </Link>
              <Link
                href={"https://www.linkedin.com/in/ravindra-sirvi/"}
                className="text-gray-400 hover:text-white"
                target="_blank"
              >
                LinkedIn
              </Link>
              <Link
                href={"https://twitter.com/ravindra_sirvi"}
                className="text-gray-400 hover:text-white"
                target="_blank"
              >
                Twitter
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{isHindi ? "संपर्क" : "Contact"}</p>
              <Link
                href={"tel:+918107199052"}
                className="text-gray-400 hover:text-white"
              >
                +91 8107199052
              </Link>
              <Link
                href={"mailto:sirviravindra609@gmail.com"}
                className="text-gray-400 hover:text-white"
              >
                sirviravindra609@gmail.com
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{isHindi ? "सेवाएँ" : "Services"}</p>
              <Link href={"#"} className="text-gray-400 hover:text-white">
                {isHindi ? "वेबसाइट डेवलपमेंट" : "Website Development"}
              </Link>
              <Link href={"#"} className="text-gray-400 hover:text-white">
                {isHindi ? "मोबाइल ऐप डेवलपमेंट" : "Mobile App Development"}
              </Link>
              <Link href={"#"} className="text-gray-400 hover:text-white">
                {isHindi ? "ई-कॉमर्स वेबसाइट" : "E-commerce Website"}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-gray-400 text-sm">
          <p>
            © 2024 {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}
          </p>
          <div className="flex gap-4">
            <Link href={"#"} className="hover:text-white">
              {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <Link href={"#"} className="hover:text-white">
              {isHindi ? "सेवा की शर्तें" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
