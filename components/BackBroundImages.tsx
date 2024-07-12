import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function BackgroundImages({ count, imageSize }) {
	const images = useMemo(() => ['/logo-3.png', '/logo-4.png', '/logo-5.png'], []);
	const [imageElements, setImageElements] = useState([]);

	// Function to generate initial image elements
	const generateImageElements = () => {
		const elements = [];
		for (let i = 0; i < count; i++) {
			const image = images[Math.floor(Math.random() * images.length)];
			elements.push({ image });
		}
		return elements;
	};

	// Function to calculate positions based on window size
	const calculateImagePositions = () => {
		const elements = [...imageElements];
		const numRows = Math.ceil(Math.sqrt(count));
		const numCols = Math.ceil(count / numRows);
		const spacingX = window.innerWidth / numCols;
		const spacingY = window.innerHeight / numRows;

		for (let i = 0; i < count; i++) {
			const row = Math.floor(i / numCols);
			const col = i % numCols;
			const x = col * spacingX + spacingX / 2 - imageSize / 2;
			const y = row * spacingY + spacingY / 2 - imageSize / 2;
			elements[i] = { ...elements[i], x, y };
		}

		setImageElements(elements);
	};

	// Initialize image elements on first render
	useEffect(() => {
		setImageElements(generateImageElements());
	}, [count, images]);

	// Update positions on window resize
	useEffect(() => {
		if (imageElements.length) {
			calculateImagePositions();
		}
		window.onresize = calculateImagePositions;
		return () => {
			window.onresize = null;
		};
	}, [imageElements, count, imageSize]);

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
