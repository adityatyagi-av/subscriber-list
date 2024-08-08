import { UserList } from "../models/subscriber-model.js";

// Function to get all subscribers
export const getSubscribers = async (req, res, next) => {
    try {
        const allSubscribers = await UserList.find();
        res.status(200).json({
            success: true,
            data: allSubscribers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Function to add a subscriber
export const addSubscriber = async (req, res, next) => {
    try {
        const data = req.body;

        console.log(data);

        const user = {
            name: data.name,
            email: data.email,
        };

        // Check if the user already exists
        const userExist = await UserList.findOne({ email: data.email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "Subscriber already exists",
            });
        }
        const newSubscriber = await UserList.create(user);
        res.status(201).json({
            success: true,
            data: newSubscriber,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const editSubscriber = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSubscriber = await UserList.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedSubscriber) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedSubscriber,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteSubscriber = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find and delete the subscriber
        const deletedSubscriber = await UserList.findByIdAndDelete(id);
        if (!deletedSubscriber) {
            return res.status(404).json({
                success: false,
                message: "Subscriber not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Subscriber deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};