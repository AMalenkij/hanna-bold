'use client'
import { Button } from "@/components/ui/button"
import HeroImg from "@/public/img/Hero.jpg"
import { motion, useScroll, useTransform } from 'framer-motion'
import type { FC } from "react"
import { useRef } from 'react'

interface HeroComponentProps {
	heading: string
	date: string
	announcement: string
	buttonLabel: string
}

const HeroComponent: FC<HeroComponentProps> = ({
	heading,
	date,
	announcement,
	buttonLabel,
}) => {
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	})

	// Parallax background transformation
	const backgroundY = useTransform(scrollYProgress, [0, 1], [0.0, 700])
	const backgroundX = useTransform(scrollYProgress, [0.2, 1], [0.0, 200])
	// Tilt effect transformation
	const tilt = useTransform(scrollYProgress, [0.2, 1], [0.0, 14]) // Max tilt: 18 degrees

	return (
		<motion.div
			ref={ref}
			style={{
				rotateZ: tilt, // Apply rotation
				transformOrigin: 'bottom right', // Rotation anchor at bottom right
				willChange: 'transform', // Optimize performance for animations
				x: backgroundX,
			}}
			className="relative"
		>
			<div className="relative min-h-screen w-full overflow-hidden">
				{/* Parallax background */}
				<motion.div
					style={{
						y: backgroundY,
						willChange: 'transform', // Optimize performance for animations
						backgroundImage: `url(${HeroImg.src})`,
					}}
					className="-z-20 absolute inset-0 bg-center bg-cover bg-fixed"
				/>
				{/* Red layer over background */}
				<div className="-z-10 absolute inset-0 bg-red-700 mix-blend-multiply" />

				{/* Content */}
				<h1 className="mt-10 font-semibold text-[150px] text-stone-50">
					{heading}
				</h1>
				<div className="absolute bottom-0 z-10 px-4">
					<p className="mb-4 text-lg text-stone-200">/ {date}</p>
					<p className="mb-6 text-stone-400 text-xl">{announcement}</p>
					<Button variant="link">{buttonLabel}</Button>
				</div>
			</div>
		</motion.div>
	)
}

export default HeroComponent