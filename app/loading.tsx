import Image from "next/image";

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen relative">
			<div className="absolute inset-0 bg-custom-dark bg-opacity-50 backdrop-blur-md"></div>
			<div className="relative z-10">
				<Image src="/logo-2.png" alt="Loading" width={700} height={700} />
			</div>
		</div>
	);
}