"use client";

import { useEffect, useRef } from "react";
import HeroImg from "@/public/img/hero.webp";
import LargeTitle from "./largeTitle";

export default function ParallaxEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !overlayRef.current) return;

      // Calculate how far we've scrolled through the container (0 to 1)
      const container = containerRef.current;
      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollProgress =
        (scrollPosition - containerTop) /
        (containerHeight - window.innerHeight);

      // Move the overlay up based on scroll progress
      // At start: overlay at top (0)
      // At end: overlay moved up by -100vh (completely out of view)
      const translateY = -scrollProgress * window.innerHeight;
      overlayRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div
        ref={backgroundRef}
        style={{
          backgroundImage: `url(${HeroImg.src})`,
        }}
        className="-z-20 absolute inset-0 bg-center bg-cover bg-fixed"
      />

      {/* Red overlay that moves up as we scroll */}
      <div
        ref={overlayRef}
        className="sticky top-0 z-10 h-screen bg-red-700 mix-blend-multiply"
      />
      <LargeTitle className="container absolute bottom-1/2 z-20 text-stone-50" />
    </div>
  );
}
