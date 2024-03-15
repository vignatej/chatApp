import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 6},
    consumer_or_businessRepresentative: {type: String, required: true, enum: ["Consumer", "BusinessRepresentative"]},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;