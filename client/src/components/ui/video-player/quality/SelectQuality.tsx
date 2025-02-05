'use client'

import cn from 'clsx'
import { AnimatePresence, m } from 'framer-motion'

import { useOutside } from '@/hooks/useOutside'

import { EnumVideoPlayerQuality } from '../video-player.types'

import { VIDEO_QUALITIES } from './qualities.data'

interface Props {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
	const { isShow, ref, setIsShow } = useOutside(false)

	const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='transition-colors hover:text-primary'
			>
				{currentValue}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
					>
						<ul className='bg-gray-800 py-2 px-4 rounded absolute bottom-8 right-0 z-10 shadow'>
							{availableQualities.map(quality => (
								<li
									key={quality}
									className='mb-1'
								>
									<button
										onClick={() => {
											onChange(quality)
											setIsShow(false)
										}}
										className={cn('border-b border-b-transparent transition-colors', {
											'hover:text-primary': quality !== currentValue,
											'border-b-white': quality === currentValue
										})}
										disabled={quality === currentValue}
									>
										{quality}
									</button>
								</li>
							))}
						</ul>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}
