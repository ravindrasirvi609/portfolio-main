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

const Home = () => {
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

  useEffect(() => {
    const audio = new Audio("/ravindra_audio.mp3");
    // Function to handle user interaction
    const handleUserInteraction = () => {
      audio.play().catch((error) => {
        console.error("Error playing audio on user interaction:", error);
      });
      document.removeEventListener("click", handleUserInteraction);
    };

    // Add event listener for user interaction
    document.addEventListener("click", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    // This code now runs only on the client side
    const element = document.querySelector(".cb-legal-text");

    if (element) {
      element.removeAttribute("href");
      element.textContent = "";
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Github />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
        <CaptureVisitor />
      </div>
    </main>
  );
};

export default Home;
