import mongoose from 'mongoose';
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


//Will convert the password in the hased format before saving to the databse
userSchema.pre('save', async function(next) {
    // This will check if the password is beign modified or not
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // This will hash the password for 10 rounds
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
