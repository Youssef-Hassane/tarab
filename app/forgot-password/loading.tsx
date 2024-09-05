// File: app/signup/loading.tsx
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarImage";


function Loading() {
	return (
		<div className="flex items-center justify-center h-screen relative">
			<div className="absolute inset-0 bg-custom-dark bg-opacity-50 backdrop-blur-md"></div>
			<div className="relative z-10">
				{/* <Image src="/logo-2.png" alt="Loading" width={700} height={700} /> */}
				
				<Avatar className={`rounded-none w-[700px]  h-[700px]`}>
					<AvatarImage src="/logo-2.png" />
					<AvatarFallback></AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}


export default Loading;