import truncateText from "@/utils/truncateText";

export default function ChannelName({ item }) {


	return (
		<h1 className="text-gray-500 text-[12px]">
			{truncateText(item.snippet.channelTitle, 20)}
		</h1>
	)
}