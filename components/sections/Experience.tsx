"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { workExperience } from "@/data";
import { Award, Calendar } from "lucide-react";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            My professional journey and key achievements in the tech industry
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {workExperience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {index !== workExperience.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-purple-500" />
              )}

              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-8 h-8 text-white" />
                </div>

                <Card className="flex-1 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                          {exp.title}
                        </CardTitle>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {exp.company}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="flex items-center space-x-1"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>{exp.duration}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      {exp.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
