import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const loggedInUserRole = req.user.consumer_or_businessRepresentative;

        let filteredUsers;

        if (loggedInUserRole === "Consumer") {
            // If the logged-in user is a consumer, fetch all BusinessRepresentative users
            filteredUsers = await User.find({ consumer_or_businessRepresentative: "BusinessRepresentative" }).select("-password");
        } else if (loggedInUserRole === "BusinessRepresentative") {
            // If the logged-in user is a BusinessRepresentative, fetch all consumer users
            filteredUsers = await User.find({ consumer_or_businessRepresentative: "Consumer" }).select("-password");
        } else {
            return res.status(400).json({ error: "Invalid user role" });
        }

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
