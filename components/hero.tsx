"use client";

import { useEffect, useRef } from "react";
import HeroImg from "@/public/img/hero.webp";
import LargeTitle from "./largeTitle";
import Image from "next/image";

export default function ParallaxEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      <Image
        src={HeroImg}
        alt="Hero background"
        width={6000}
        height={3000}
        priority
        className="-z-40 top-0 object-cover object-center"
        style={{
          position: "sticky",
          height: "100vh",
          width: "100vw",
        }}
      />
      {/* Red overlay that moves up as we scroll */}
      <div className="absolute top-0 z-10 h-screen w-full bg-red-700 mix-blend-multiply" />
      <LargeTitle className="container absolute bottom-1/2 isolation-auto z-20 text-stone-50" />
    </div>
  );
}
