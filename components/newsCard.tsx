import Link from 'next/link'
interface NewsCardProps {
	date: {
		date: string
		month: string
		year: string
		time: string
	}
	title: string
	content: string
	imageUrl: string
	slug: string
}

export default function NewsCard({ date, title, content, imageUrl, slug }: NewsCardProps) {
	return (
		<article className="mx-auto">
			<Link href={`posts/${slug}`}>
			<div className="space-y-6">
				{/* Image */}
				<div className="aspect-[16/9] overflow-hidden rounded-lg">
					<img
						src={`https://hanna-s3.s3.amazonaws.com/static/${imageUrl}`}
						alt={title}
						className="h-full w-full object-cover"
					/>
				</div>
				{/* Date */}
				<div className="text-muted-foreground text-sm">
					{`/ ${date.date} ${date.month} ${date.year} ${date.time}`}
				</div>
				{/* Title */}
				<h2 className="font-bold text-4xl leading-tight tracking-tight">
					{title}
				</h2>
				{/* Content */}
				<p className="text-muted-foreground text-xl leading-relaxed">
					{content}
				</p>
			</div>
			</Link>
		</article>
	)
}