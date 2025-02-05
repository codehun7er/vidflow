'use client'

import { Heart } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { HorizontalVideoItem } from '@/ui/video-item/HorizontalVideoItem'

import { useProfile } from '@/hooks/useProfile'

export function LikedVideosPage() {
	const { profile, isLoading } = useProfile()

	return (
		<section className='w-1/2'>
			<div className='flex gap-8 mb-10'>
				<Heading
					isPageHeading
					Icon={Heart}
					className='mb-0'
				>
					Liked videos
				</Heading>

				{!!profile?.likes.length && <span>{profile.likes.length} videos</span>}
			</div>
			<div>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-28 rounded-md mb-6'
					/>
				) : profile?.likes?.length ? (
					profile?.likes?.map(like => (
						<HorizontalVideoItem
							key={like.video.id}
							video={like.video}
						/>
					))
				) : (
					<p>Liked videos not found!</p>
				)}
			</div>
		</section>
	)
}
