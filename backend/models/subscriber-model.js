import mongoose from "mongoose";
const schema = new mongoose.Schema({ name: String, email: String });
export const UserList = mongoose.model('users', schema);