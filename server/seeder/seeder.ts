import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { nanoid } from 'nanoid'
import { CHANNELS } from './channels.data'
import { VIDEOS } from './videos/videos.data'

const prisma = new PrismaClient()

async function main() {
	const users = []
	const channelSlugToId: { [key: string]: string } = {}

	for (const channel of CHANNELS) {
		const password = '123456'
		const hashedPassword = await hash(password)

		const email = `${channel.slug}@test.com`

		const user = await prisma.user.create({
			data: {
				name: channel.name,
				email: email,
				password: hashedPassword
			}
		})

		const createdChannel = await prisma.channel.create({
			data: {
				slug: channel.slug,
				description: channel.description || '',
				avatarUrl: channel.avatarUrl || '',
				bannerUrl: channel.bannerUrl || '',
				isVerified: channel.isVerified || false,
				user: {
					connect: { id: user.id }
				}
			}
		})

		users.push(user)
		channelSlugToId[channel.slug] = createdChannel.id
	}

	for (const videoData of VIDEOS) {
		const channelId = channelSlugToId[videoData.channelSlug]

		if (!channelId) {
			continue
		}

		const createdAt = faker.date.between({
			from: faker.date.recent({
				days: 365
			}),
			to: new Date()
		})

		const video = await prisma.video.create({
			data: {
				publicId: nanoid(10),
				title: videoData.title,
				description: videoData.description || '',
				thumbnailUrl: videoData.thumbnailUrl || '',
				videoFileName: videoData.videoFileName || '',
				maxResolution: videoData.maxResolution,
				viewsCount: videoData.viewsCount || 0,
				isPublic: videoData.isPublic || false,
				channelId: channelId,
				createdAt: createdAt,
				tags: {
					connectOrCreate: videoData.tags?.map(tagName => ({
						where: { name: tagName },
						create: { name: tagName }
					}))
				}
			}
		})

		const numComments = faker.number.int({ min: 1, max: 10 })
		for (let i = 0; i < numComments; i++) {
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			await prisma.videoComment.create({
				data: {
					text: faker.lorem.sentences(),
					userId: randomUser.id,
					videoId: video.id,
					createdAt: faker.date.between({ from: createdAt, to: new Date() })
				}
			})
		}

		const numLikes = faker.number.int({ min: 1, max: 10 })
		const likedUserIds = new Set<string>()

		for (let i = 0; i < numLikes; i++) {
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			if (!likedUserIds.has(randomUser.id)) {
				likedUserIds.add(randomUser.id)

				await prisma.videoLike.create({
					data: {
						userId: randomUser.id,
						videoId: video.id,
						createdAt: faker.date.between({ from: createdAt, to: new Date() })
					}
				})
			}
		}
	}
}

main()
	.catch(e => {
		console.error('Ошибка при заполнении базы данных:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
