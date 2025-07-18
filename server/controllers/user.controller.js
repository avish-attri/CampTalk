import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }
        // Check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username already exists. Please choose another.' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = new UserModel({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error during registration.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'No account found with that username.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password.' });
        }
        res.status(200).json({ success: true, message: 'Login successful.' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error during login.' });
    }
};

export { registerUser, loginUser }; 