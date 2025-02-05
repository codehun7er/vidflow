import type { Metadata } from 'next'

import { ChannelPage } from './ChannelPage'
import { ChannelVideos } from './ChannelVideos'
import { channelService } from '@/services/channel.service'
import type { TPageSlugProp } from '@/types/page.types'

export const revalidate = 100

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const slug = (await params).slug
	const data = await channelService.bySlug(slug)
	const channel = data.data

	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			images: [channel.bannerUrl]
		}
	}
}

export async function generateStaticParams() {
	try {
		const { data } = await channelService.getAll()

		return data
			.filter(channel => channel.slug)
			.map(channel => ({
				slug: channel.slug
			}))
	} catch (error) {
		console.log('Error in c/[slug] page')
		return []
	}
}

export default async function Page({ params }: TPageSlugProp) {
	const slug = (await params).slug
	const data = await channelService.bySlug(slug)
	const channel = data.data

	return (
		<section>
			<ChannelPage channel={channel} />
			{!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
		</section>
	)
}
