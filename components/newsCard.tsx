interface NewsCardProps {
	date: string
	title: string
	content: string
	imageUrl: string
 }
 
 export default function NewsCard({ date, title, content, imageUrl }: NewsCardProps) {
	return (
	  <article className="mx-auto">
		 <div className="space-y-6">
			{/* Image */}
			<div className="aspect-[16/9] overflow-hidden rounded-lg">
			  <img 
				 src={imageUrl} 
				 alt={title}
				 className="w-full h-full object-cover"
			  />
			</div>
			
			{/* Date */}
			<div className="text-sm text-muted-foreground">
			  / {date}
			</div>
			
			{/* Title */}
			<h2 className="text-4xl font-bold tracking-tight leading-tight">
			  {title}
			</h2>
			
			{/* Content */}
			<p className="text-xl text-muted-foreground leading-relaxed">
			  {content}
			</p>
		 </div>
	  </article>
	)
 }