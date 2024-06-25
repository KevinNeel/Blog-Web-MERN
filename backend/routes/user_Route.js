import express from 'express'
const user = express.Router();

import {
    registerUser,
    loginUser,
    // myProfile
} from '../controller/user_Controller.js';

// import authMiddleWare from '../middleware/authMiddleware.js'

user.post('/register', registerUser);
user.post('/login', loginUser);

// user.post('/myProfile', authMiddleWare, myProfile);

export default user
