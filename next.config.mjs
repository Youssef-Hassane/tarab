/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'i.ytimg.com',
		},
		{
		  protocol: 'https',
		  hostname: 'yt3.ggpht.com',
		},
	  ],
	},
	typescript: {
	  // Ignoring TypeScript errors during build
	  ignoreBuildErrors: true,
	},
	eslint: {
	  // Ignoring ESLint errors during build
	  ignoreDuringBuilds: true,
	},
  };
  
  export default nextConfig;
  