import YouTubeMusic from '@/public/svg/brands/YMysic'
import YouTube from '@/public/svg/brands/YouTube'
import AmazonMusic from '@/public/svg/brands/amazonMusic'
import Deezer from '@/public/svg/brands/deezer'
import FaceBook from '@/public/svg/brands/facebook'
import Instagram from '@/public/svg/brands/instagram'
import Spotify from '@/public/svg/brands/spotify'

export default function CallToAction() {
	return (
		<div className="mt-12 text-center">
			<h2 className="mb-6 text-6xl">Listen on your platform</h2>
			<h3 className="mb-16 text-3xl">Subscribe, so you don't miss the release of new songs. We wish you a pleasant experience</h3>
			<div className="mb-6 flex items-center justify-center space-x-8">
				<AmazonMusic className='mt-5' />
				<Deezer />
				<FaceBook className='mt-1' />
				<Instagram className='mt-5' />
			</div>
			<div className="flex items-center justify-center space-x-8">
				<YouTubeMusic />
				<Spotify className='p-0.5' />
				<YouTube />
			</div>
		</div>
	)
}