'use client'

import dynamicNext from 'next/dynamic'
import Image from 'next/image'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { transformCount } from '@/utils/transform-count'

import type { IChannel } from '@/types/channel.types'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: false, loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' /> }
)

export function ChannelPage({ channel }: { channel: IChannel }) {
	return (
		<div>
			<div className='relative w-full h-[249px] rounded-2xl overflow-hidden shadow-md'>
				<Image
					alt={channel.user.name || ''}
					src={channel.bannerUrl}
					fill
					style={{ objectFit: 'cover' }}
					quality={100}
					priority
				/>
			</div>
			<div className='flex items-start gap-5 mt-7 mb-12 w-1/2'>
				<Image
					alt={channel.slug}
					src={channel.avatarUrl}
					width={162}
					height={162}
					className='rounded-xl flex-shrink-0 shadow-md'
					quality={100}
					priority
				/>
				<div>
					<Heading
						isPageHeading
						className='mb-3'
					>
						<span className='flex items-center gap-2'>
							{channel.user.name}
							{channel.isVerified && <VerifiedBadge size={18} />}
						</span>
					</Heading>
					<div className='mb-2 text-gray-400 text-[0.9rem] flex items-center gap-1'>
						<span>/{channel.slug}</span>
						<span>•</span>
						<span>{transformCount(channel.subscribers.length)} subscribers</span>
						<span>•</span>
						<span>{channel.videos.length} videos</span>
					</div>
					<article className='mb-4 text-gray-400 text-sm leading-snug w-3/4'>
						{channel.description}
					</article>
					<DynamicSubscribeButton slug={channel.slug} />
				</div>
			</div>
		</div>
	)
}
