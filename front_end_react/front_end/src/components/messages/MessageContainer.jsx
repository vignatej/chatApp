import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='w-full flex flex-col h-5/6'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-white px-4 py-2 mb-2'>
						<span className='text-gray-900'>To: {selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className=''>
			<div className='px-4 text-center text-gray-100'>
				<p className="text-5xl">Welcome {authUser.fullName}</p>
				<p>you are a {authUser.consumer_or_businessRepresentative}</p>			
			</div>
		</div>
	);
};
