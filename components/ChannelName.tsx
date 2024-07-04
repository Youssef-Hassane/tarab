export default function ChannelName({ item }) {


	return (
		<h1 className="text-gray-500 text-[12px]">
			{item.snippet.channelTitle}
		</h1>
	)
}