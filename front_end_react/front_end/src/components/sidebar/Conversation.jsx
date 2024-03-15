import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 p-2 py-1
				${isSelected ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-100'>{conversation.fullName} {`${isOnline ? "(online)":""}`}</p>
					</div>
				</div>
			</div>
			<div className='divider my-0 py-0 h-2' />
		</>
	);
};
export default Conversation;
