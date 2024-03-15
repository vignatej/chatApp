import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
	const { loading, logout } = useLogout();
	return (
		<div className=''>
			{!loading ? (
				<a onClick={logout}>click here to logout</a>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;