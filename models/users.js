import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: /^[a-zA-Z0-9]{8,20}$/,
    },
    image: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740'

    }
});



const User = mongoose.models.User || mongoose.model("User", UserSchema);


export default User;