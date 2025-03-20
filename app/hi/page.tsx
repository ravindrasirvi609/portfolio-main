"use client";

import { navItems } from "@/data";
import axios from "axios";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { useEffect, useState } from "react";
import Github from "@/components/Github";
import CaptureVisitor from "@/components/userInformation";
import Head from "next/head";

const HindiHome = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timer);
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          console.log("Location:", newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location) {
      submitHandler(location);
    }
  }, [location]);

  const submitHandler = async (location: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const response = await axios.post("/api/addVisitor", location);
      console.log(response);
    } catch (error) {
      console.error("Error submitting location:", error);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="भारत में वेबसाइट और मोबाइल ऐप डेवलपमेंट के लिए संपर्क करें। सस्ती वेबसाइट डिजाइन और डेवेलपमेंट सेवाएं। बिज़नेस वेबसाइट, ई-कॉमर्स और मोबाइल ऐप्स बनवाएं।"
        />
        <meta
          name="keywords"
          content="वेबसाइट डेवलपर, वेबसाइट डिजाइन, मोबाइल ऐप डेवलपमेंट, सस्ती वेबसाइट, भारत में वेबसाइट बनवाना, वेबसाइट कीमत, ई-कॉमर्स वेबसाइट"
        />
        <meta name="author" content="रविंद्र सिरवी" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="geo.region" content="IN" />
        <meta property="og:locale" content="hi_IN" />
        <link
          rel="alternate"
          hrefLang="en-in"
          href="https://www.ravindrachoudhary.in/"
        />
        <link rel="canonical" href="https://www.ravindrachoudhary.in/hi" />
      </Head>

      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />

          {/* Hindi Version of Hero Section */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto mt-24 mb-10">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6">
                वेबसाइट और ऐप डेवलपमेंट सेवाएँ
              </h1>
              <p className="text-xl mb-8">
                भारत में प्रोफेशनल और किफायती वेबसाइट डेवलपमेंट सेवाएँ। अपनी
                बिज़नेस वेबसाइट, ई-कॉमर्स प्लेटफॉर्म या मोबाइल ऐप बनवाने के लिए
                हमसे संपर्क करें।
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md">
                संपर्क करें
              </button>
            </div>
          </div>

          <Grid />
          <Github />
          <RecentProjects />

          {/* Hindi Service Section */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              हमारी सेवाएँ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-3">बिज़नेस वेबसाइट</h3>
                <p>
                  प्रोफेशनल बिज़नेस वेबसाइट जो आपके व्यापार को ऑनलाइन बढ़ावा
                  देगी। मोबाइल रेस्पोंसिव और SEO फ्रेंडली डिज़ाइन।
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-3">ई-कॉमर्स वेबसाइट</h3>
                <p>
                  ऑनलाइन शॉपिंग के लिए कस्टम ई-कॉमर्स वेबसाइट। पेमेंट गेटवे
                  इंटीग्रेशन और प्रोडक्ट मैनेजमेंट फीचर्स।
                </p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-3">मोबाइल ऐप डेवलपमेंट</h3>
                <p>
                  Android और iOS के लिए कस्टम मोबाइल ऐप्स। आपके बिज़नेस के लिए
                  इनोवेटिव मोबाइल सॉल्यूशंस।
                </p>
              </div>
            </div>
          </div>

          <Clients />
          <Experience />
          <Approach />

          {/* Hindi FAQ Section */}
          <div className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  वेबसाइट बनवाने का खर्च कितना होता है?
                </h3>
                <p>
                  वेबसाइट का खर्च ₹10,000 से शुरू होता है और वेबसाइट के प्रकार
                  और फीचर्स के आधार पर बदलता है। बिज़नेस वेबसाइट, ई-कॉमर्स या
                  कस्टम वेबसाइट के लिए अलग-अलग प्राइस होता है।
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  वेबसाइट बनाने में कितना समय लगता है?
                </h3>
                <p>
                  एक सिंपल वेबसाइट 1-2 सप्ताह में बन जाती है, जबकि ई-कॉमर्स या
                  कॉम्प्लेक्स वेबसाइट में 4-8 सप्ताह का समय लग सकता है।
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  क्या आप पूरे भारत में सेवाएँ प्रदान करते हैं?
                </h3>
                <p>
                  हां, हम पूरे भारत में वेबसाइट और मोबाइल ऐप डेवलपमेंट सेवाएँ
                  प्रदान करते हैं। दिल्ली, मुंबई, बैंगलोर, जयपुर, हैदराबाद और
                  अन्य सभी शहरों में हमारे क्लाइंट्स हैं।
                </p>
              </div>
            </div>
          </div>

          <Footer />
          <CaptureVisitor />
        </div>
      </main>
    </>
  );
};

export default HindiHome;
