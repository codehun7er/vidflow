'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { StudioVideoItem } from '@/ui/studio-video-item/StudioVideoItem'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { studioVideoService } from '@/services/studio/studio-video.service'

export function StudioVideoList() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['studioVideoList'],
		queryFn: ({ pageParam }) =>
			studioVideoService.getAll({
				page: pageParam.page,
				limit: 8
			}),
		initialPageParam: { page: 1 },
		getNextPageParam: lastPage => {
			const { page, totalPages } = lastPage

			return page < totalPages ? { page: page + 1 } : undefined
		}
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []

	return (
		<section className='pb-5'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={3}
					className='h-32 rounded-md mb-8'
				/>
			) : (
				allVideos.map(video => (
					<StudioVideoItem
						key={video.id}
						video={video}
					/>
				))
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={3}
					className='h-32 rounded-md mb-8'
				/>
			)}
		</section>
	)
}
