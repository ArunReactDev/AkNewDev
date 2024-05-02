const express = require("express");
const router = express.Router();
const SupportTickets = require("../models/supportTickets"); // Import model from separate folder
const Users = require("../models/users"); // Import model from separate folder
const { body, validationResult } = require("express-validator");
const {
    verifyToken
} = require("../helpers/helper");
const mongoose = require("mongoose");
const multer = require("multer");

// Configure multer to specify where to store uploaded files and their names
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // File name will be current timestamp + original file name
    }
})

const upload = multer({ storage: storage })

router.post(
    "/create_ticket",
    verifyToken,
    upload.single('issue_img'), // Use upload.single() middleware to handle single file uploads
    [
        // validation checks
        body("email").notEmpty().withMessage("Email is required")
            .isEmail().withMessage('Email must be a valid email address'),
        body("name").notEmpty().withMessage("Name is required"),
        body("issue_description")
            .notEmpty()
            .withMessage("Issue Description is required")
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        // If validation passes, proceed with your logic

        const user = await Users.findById(
            req.userId,
            "name email mobile_number _id pan_no subscription created_at subscription_start_date subscription_end_date status"
        );

        // If user profile not found, return error
        if (!user) {
            return res.status(200).json({ status: false, message: "User profile not found" });
        }

        if(user.name !== req.body.name) {
            return res.status(200).json({ status: false, message: "User Name not Match with this account" });
        }
       
        if(user.email !== req.body.email) {
            return res.status(200).json({ status: false, message: "User Email not Match with this account" });
        }


        // Access validated data through req.body

        const issueImg = req.file; // Uploaded file information
        const baseUrl = req.protocol + '://' + req.get('host');
        const newTicket = new SupportTickets({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            issue_description: req.body.issue_description,
            status : 0,
            issue_img : issueImg ? `${baseUrl}/${issueImg.path.replace(/\s+/g, '')}` : null // Save file path in database, if uploaded
        });

        newTicket
            .save()
            .then(() =>
                res.json({ status: true, message: "Ticket Created successfully!" })
            )
            .catch((err) =>
                res.status(200).json({ status: false, message: err.message })
            );
    }
);

router.get("/list_tickets", verifyToken, async (req, res) => {
    try {
        // Fetch user profile
        const tickets = await SupportTickets.find();
        // Respond with user profile
        return res.status(200).json({ status: true, data: tickets });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


router.post("/change_ticketstatus", 
            verifyToken, 
            [
                // validation checks
                body("id").notEmpty().withMessage("Ticket Id is required"),
                body("status").notEmpty().withMessage("Status is required"),
            ],
            async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }
        const {status , id} = req.body;
        // Fetch user profile
        const tickets = await SupportTickets.findOne({_id : id});

        if (!tickets) {
            return res.status(200).json({ status: false, message: "Tickets not found" });
        }

        // Respond with tickets profile
        tickets.status = status;
        tickets
        .save()
        .then(() =>
            res.json({ status: true, message: "Status Updated successfully!" })
        )
        .catch((err) =>
            res.status(200).json({ status: false, message: err.message })
        );
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


module.exports = router;
