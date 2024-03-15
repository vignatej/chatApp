import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='border-r border-slate-500 py-4 flex flex-col'>
			<div className="text-2xl">Hi {authUser.fullName}</div>
			<LogoutButton />
			<div className='divider px-3'></div>
			<Conversations />
		</div>
	);
};
export default Sidebar;
