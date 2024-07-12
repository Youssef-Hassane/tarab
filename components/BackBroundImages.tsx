import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';



export default function BackgroundImages({ count, imageSize }) {
	const images = useMemo(() => ['/logo-3.png', '/logo-4.png', '/logo-5.png'], []);
	const [imageElements, setImageElements] = useState([]);

	const imageSizeFunction = () => {
		const elements = [];
		const numRows = Math.ceil(Math.sqrt(count));
		const numCols = Math.ceil(count / numRows);
		const spacingX = window.innerWidth / numCols;
		const spacingY = window.innerHeight / numRows;
	
		for (let i = 0; i < count; i++) {
			const row = Math.floor(i / numCols);
			const col = i % numCols;
			const x = col * spacingX + spacingX / 2 - imageSize / 2;
			const y = row * spacingY + spacingY / 2 - imageSize / 2;
			const image = images[Math.floor(Math.random() * images.length)];
			elements.push({ image, x, y });
		}
	
		setImageElements(elements);
	};


	useEffect(() => {
		imageSizeFunction();
		window.onresize = imageSizeFunction;
	}, [count, imageSize, images]);

	return (
		<>
			{imageElements.map((element, i) => (
				<Image
					key={i}
					src={element.image}
					alt="background icon"
					style={{
						position: 'absolute',
						left: `${element.x}px`,
						top: `${element.y}px`,
						opacity: 0.5,
						zIndex: 1,
					}}
					width={imageSize}
					height={imageSize}
				/>
			))}
		</>
	);
};