import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatarImage';

export default function LoginBoxImage() {

	return (
		<div className="flex items-center justify-center w-[390px]">

			<div className='w-[264px] h-[264px]'>
				

				<Avatar className={`rounded-none mx-3 w-[264px] h-[264px]`}>
					<AvatarImage src="/logo-2.png" />
					<AvatarFallback></AvatarFallback>
				</Avatar>

			</div>
		</div>
	);

};