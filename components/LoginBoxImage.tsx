import Image from 'next/image';

export default function LoginBoxImage() {

	return (
		<div className="flex items-center justify-center w-[390px]">

			<div className='w-[264px] h-[264px]'>
				<Image
					src="/logo-2.png"
					alt="logo"
					className=''
					width={500}
					height={500}
					priority
				/>
			</div>
		</div>
	);

};