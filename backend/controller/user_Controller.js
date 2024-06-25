import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

//Model
import User from '../model/User.js';

export const registerUser = async (req, res) => {
    try {
        const data = req.body;

        console.log(data);

        const user = await User.findOne({ email: data.email }).lean();

        if (user) return res.status(409).json({ message: 'User already exist' });

        if (data.password != data.confirmPassword) return res.status(403).json({ message: 'Password do not match' });

        const saveUser = await User({
            userName: data.userName,
            email: data.email,
            password: data.password
        });

        await saveUser.save();

        res.status(201).json({ message: "User Registered" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).lean();

        if (!user) return res.status(404).json({ message: 'User does not exist' });

        let validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return res.status(401).json({ message: "Invalid Password" });

        const token = jwt.sign({ user: user.id, email: user.email }, process.env.JWT_KEY_KEY, { expiresIn: '1d' });

        let loginedUser = {
            id: user._id,
            email: user.email,
            username: user.userName
        }

        res.status(200).json({ user: loginedUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" })
    }
}

// export const myProfile = async(req,res)=>{
//     try {
            //The user id will be available from middleware
//         const userId = req.userId;

//         const user = await User.findOne({_id: userId}).select('userName email');

//         res.status(200).json(user)

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// }

