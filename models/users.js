import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"Email Already exists"],
        required:[true,"Email is Required"],
    },
    username:{
        type:String,
        required:[true,"Username is Required"],
        match:[[/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]]
    },
    image:{
        type : String , default:'https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740'
    }
})



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

 