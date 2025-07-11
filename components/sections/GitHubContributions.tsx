"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Star,
  GitFork,
  GitPullRequest,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

interface GitHubStats {
  totalContributions: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  totalPullRequests: number;
  topLanguages: { [key: string]: number };
  contributions: {
    date: string;
    count: number;
  }[];
}

export const GitHubContributions = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          "https://api.github.com/users/ravindrasirvi609"
        );
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          "https://api.github.com/users/ravindrasirvi609/repos"
        );
        const reposData = await reposResponse.json();

        // Calculate statistics
        const totalStars = reposData.reduce(
          (acc: number, repo: any) => acc + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (acc: number, repo: any) => acc + repo.forks_count,
          0
        );

        // Get language statistics
        const languages: { [key: string]: number } = {};
        for (const repo of reposData) {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        // Sort languages by frequency
        const sortedLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

        // Generate mock contribution data for the last year
        const contributions = generateMockContributions();

        setStats({
          totalContributions: userData.public_repos * 10,
          totalRepositories: userData.public_repos,
          totalStars,
          totalForks,
          totalPullRequests: Math.floor(userData.public_repos * 0.5),
          topLanguages: sortedLanguages,
          contributions,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const generateMockContributions = () => {
    const contributions = [];
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      contributions.push({
        date: d.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 10),
      });
    }

    return contributions;
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-slate-100 dark:bg-slate-800";
    if (count <= 3) return "bg-green-100 dark:bg-green-900/50";
    if (count <= 6) return "bg-green-300 dark:bg-green-800/50";
    if (count <= 9) return "bg-green-500 dark:bg-green-700/50";
    return "bg-green-700 dark:bg-green-600/50";
  };

  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleString("default", { month: "short" }));
    }
    return months;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              GitHub Activity
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Loading your GitHub contributions...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20relative overflow-hidden">
      {/* 3D Background */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            GitHub Activity
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My open source contributions and coding activity
          </p>
        </div>

        {/* Daily Contributions Calendar */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg mb-12 transform hover:scale-[1.02] transition-all duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Calendar className="w-6 h-6 text-blue-500" />
              Daily Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Month Labels */}
                <div className="flex justify-between mb-2">
                  {getMonthLabels().map((month, index) => (
                    <span
                      key={month}
                      className="text-sm text-slate-600 dark:text-slate-400"
                    >
                      {month}
                    </span>
                  ))}
                </div>

                {/* Contribution Grid */}
                <div className="grid grid-flow-col grid-rows-7 gap-1">
                  {stats?.contributions.map((contribution, index) => (
                    <div
                      key={contribution.date}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(
                        contribution.count
                      )} transition-all duration-300 hover:scale-150 cursor-pointer transform hover:rotate-12 hover:shadow-lg`}
                      onMouseEnter={() => setSelectedDate(contribution.date)}
                      onMouseLeave={() => setSelectedDate(null)}
                    />
                  ))}
                </div>

                {/* Contribution Legend */}
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Less
                  </span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
                    <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-800/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-700/50" />
                    <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-600/50" />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    More
                  </span>
                </div>

                {/* Selected Date Tooltip */}
                {selectedDate && (
                  <div className="absolute bg-white/90 dark:bg-slate-800/90 p-4 rounded-lg shadow-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm transform transition-all duration-300">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {new Date(selectedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {stats?.contributions.find((c) => c.date === selectedDate)
                        ?.count || 0}{" "}
                      contributions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Contributions */}
          <Card
            className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
              hoveredCard === "contributions" ? "rotate-y-6" : ""
            }`}
            onMouseEnter={() => setHoveredCard("contributions")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Github className="w-6 h-6 text-green-500" />
                Total Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">
                {stats?.totalContributions.toLocaleString()}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Across all repositories
              </p>
            </CardContent>
          </Card>

          {/* Total Repositories */}
          <Card
            className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
              hoveredCard === "repos" ? "rotate-y-6" : ""
            }`}
            onMouseEnter={() => setHoveredCard("repos")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <GitPullRequest className="w-6 h-6 text-blue-500" />
                Total Repositories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">
                {stats?.totalRepositories.toLocaleString()}
              </p>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Public repositories
              </p>
            </CardContent>
          </Card>

          {/* Stars & Forks */}
          <Card
            className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
              hoveredCard === "stars" ? "rotate-y-6" : ""
            }`}
            onMouseEnter={() => setHoveredCard("stars")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                <Star className="w-6 h-6 text-yellow-500" />
                Stars & Forks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stats?.totalStars.toLocaleString()}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">Stars</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stats?.totalForks.toLocaleString()}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">Forks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Languages */}
        <div className="mt-12">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">
                Top Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stats?.topLanguages &&
                  Object.entries(stats.topLanguages)
                    .slice(0, 8)
                    .map(([language, count]) => (
                      <div
                        key={language}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                      >
                        <span className="font-medium text-slate-900 dark:text-white">
                          {language}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300">
                          {count} repos
                        </span>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Profile Link */}
        <div className="mt-12 text-center">
          <Button
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            onClick={() =>
              window.open("https://github.com/ravindrasirvi609", "_blank")
            }
          >
            <Github className="w-6 h-6 mr-2" />
            View GitHub Profile
          </Button>
        </div>
      </div>
    </section>
  );
};
