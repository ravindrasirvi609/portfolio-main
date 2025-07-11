"use client";
import dynamic from "next/dynamic";

export const ScrollSceneClient = dynamic(
  () => import("./ScrollScene").then((m) => m.ScrollScene),
  { ssr: false }
);
