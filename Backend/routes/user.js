const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users"); // Import model from separate folder
const CommonSettings = require("../models/commonSettings"); // Import model from separate folder
const { body, validationResult } = require("express-validator");
const {
    verifyToken,
    generateToken,
    verifyTokenChangePassword,
    sendEmail,
} = require("../helpers/helper");
const mongoose = require("mongoose");

router.post(
    "/auth/register",
    [
        // validation checks
        body("email").notEmpty().withMessage("Email is required")
            .isEmail().withMessage('Email must be a valid email address'),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .withMessage("Password must contain atleast one uppercase letter, one lowercase letter, one number, and one special character"),
        body("name").notEmpty().withMessage("Name is required"),
        body("mobile_number")
            .notEmpty()
            .withMessage("Mobile Number is required")
            .matches(/^[6-9]\d{9}$/)
            .withMessage("Invalid Mobile number"),
        body("pan_no").notEmpty().withMessage("Pan Number is required")
            .isLength({ min: 10 })
            .withMessage("Invalid Pan Number"),
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
        // Access validated data through req.body

        // Check if the User already exists
        const existingUser = await Users.findOne({ name: req.body.name });
        if (existingUser) {
            return res
                .status(200)
                .json({ status: false, message: "User already exists" });
        }

        // Check if the Pan Number already exists
        const existingPan = await Users.findOne({ pan_no: req.body.pan_no });
        if (existingPan) {
            return res
                .status(200)
                .json({ status: false, message: "Pan Number already exists" });
        }


        // If it is not existing , Proceed with your logic

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        // If it is not existing, Proceed with your logic
        const newUser = new Users({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            mobile_number: req.body.mobile_number,
            pan_no : req.body.pan_no,
            status : 1
        });

        newUser
            .save()
            .then(() =>
                res.json({ status: true, message: "User Registered successfully!" })
            )
            .catch((err) =>
                res.status(200).json({ status: false, message: err.message })
            );
    }
);

router.post(
    "/auth/login",
    [
        // validation checks
        body("email").notEmpty().withMessage("Email is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("type").notEmpty().withMessage("Type is required"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        const { email, password , type } = req.body;

        try {
            // Find user by email
            const user = await Users.findOne({ email });
            if (!user) {
                return res
                    .status(200)
                    .json({ status: false, message: "Invalid email or password" });
            }

            if (user.status === 0) {
                return res
                    .status(200)
                    .json({ status: false, message: "Your Account is Blocked.Kindly Contact Support Team" });
            }

            if(user.role === 0 && type !== 'usr') {
                return res
                .status(200)
                .json({ status: false, message: "Invalid email or password" });
            }

            if(user.role === 1 && type !== 'adm') {
                return res
                .status(200)
                .json({ status: false, message: "Invalid email or password" });
            }

            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res
                    .status(200)
                    .json({ status: false, message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = generateToken(user._id.toString(), "1w");

            // Passwords match, authentication successful
            return res
                .status(200)
                .json({ status: true, message: "Login successful", token });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, message: "Internal Server Error" });
        }
    }
);

router.post(
    "/auth/change_password",
    [
        // validation checks
        body("email").notEmpty().withMessage("Email is required")
            .isEmail().withMessage('Email must be a valid email address'),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        const { email } = req.body;

        try {
            // Find user by email
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(200).json({ status: false, message: "Invalid User" });
            }

            // Generate JWT token
            const token = generateToken(email, "10m");

            let htmlTemplate = `
            <html>
                <head></head>
                <body>
                    <p>To Reset Your Password , Please Click the link below.</p>
                    <a href='http://localhost:3000/reset/${token}' tab='_blank'>Reset Password</a>
                </body>
            </html>
        `;

            const mailOptions = {
                from: "arunjazz1997@gmail.com",
                to: email,
                subject: "Password Reset Link",
                html: htmlTemplate,
            };

            sendEmail(mailOptions, (mail_status, mail_res) => {
                if (mail_status) {
                    return res
                        .status(200)
                        .json({
                            status: true,
                            message: "Password reset link was sent to your registered Email",
                            token,
                        });
                } else {
                    return res
                        .status(200)
                        .json({ status: false, message: "Something Went Wrong" });
                }
            });
        } catch (error) {
            return res
                .status(500)
                .json({ status: false, message: "Internal Server Error" });
        }
    }
);

router.post(
    "/auth/reset_password",
    verifyTokenChangePassword,
    [
        // validation checks
        body("token").notEmpty().withMessage("Token is required"),
        body("newpassword")
            .notEmpty()
            .withMessage("New Password is required")
            .isLength({ min: 8 })
            .withMessage("New Password must be at least 8 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .withMessage("New Password must contain atleast one uppercase letter, one lowercase letter, one number, and one special character"),
        body("confirm_newpassword")
            .notEmpty()
            .withMessage("Confirm Password is required"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        const user = await Users.findOne({ email: req.email });
        if (!user) {
            return res.status(200).json({ status: false, message: "User not found" });
        }

        // Check if New and Confirm password matches
        const passwordMatch =
            req.body.newpassword === req.body.confirm_newpassword ? true : false;
        if (!passwordMatch) {
            return res
                .status(200)
                .json({ status: false, message: "Password Does not Match" });
        }

        // If validation passes, proceed with your logic
        const hashedNewPassword = await bcrypt.hash(req.body.newpassword, 10); // 10 is the salt rounds

        user.password = hashedNewPassword;

        // Save the updated user details
        user
            .save()
            .then(() =>
                res.json({ status: true, message: "Password Updated successfully!" })
            )
            .catch((err) =>
                res.status(200).json({ status: false, message: err.message })
            );
    }
);

router.get("/profile", verifyToken, async (req, res) => {
    try {
        // Fetch user profile
        const user = await Users.findById(
            req.userId,
            "name email mobile_number _id pan_no subscription created_at subscription_start_date subscription_end_date status"
        );

        // If user profile not found, return error
        if (!user) {
            return res.status(200).json({ status: false, message: "User profile not found" });
        }

        // Fetch common settings
        const commonSettings = await CommonSettings.find();
         
        // Combine user profile and common settings
        const userProfile = {
            ...user._doc,
            trial_period: commonSettings && commonSettings[0] ? commonSettings[0].trial_period : null
        };

        // Respond with user profile
        return res.status(200).json({ status: true, user: userProfile });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});


router.post(
    "/update_profile",
    verifyToken,
    [
        // validation checks
        body("email").notEmpty().withMessage("Email is required")
            .isEmail().withMessage('Email must be a valid email address'),
        body("name").notEmpty().withMessage("Name is required"),
        body("mobile_number")
            .notEmpty()
            .withMessage("Mobile Number is required")
            .matches(/^[6-9]\d{9}$/)
            .withMessage("Invalid Mobile number"),
        body("pan_no").notEmpty().withMessage("Pan Number is required")
            .isLength({ min: 10 })
            .withMessage("Invalid Pan Number"),
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
        // Access validated data through req.body

        // Check if the User already exists
        const existingUser = await Users.findById(
            req.userId 
        );
        if (!existingUser) {
            return res.status(200).json({ status: false, message: "User not found" });
        }

        existingUser.name = req.body.name;
        existingUser.mobile_number = req.body.mobile_number;

        existingUser
        .save()
        .then(() =>
            res.json({ status: true, message: "Profile Updated successfully!" })
        )
        .catch((err) =>
            res.status(200).json({ status: false, message: err.message })
        );
    }
);

router.post(
    "/update_password",
    verifyToken,
    [
        // validation checks
        body("current_password").notEmpty().withMessage("Current Password is required"),
        body("new_password")
            .notEmpty()
            .withMessage("New Password is required")
            .isLength({ min: 8 })
            .withMessage("New Password must be at least 8 characters long")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .withMessage("New Password must contain atleast one uppercase letter, one lowercase letter, one number, and one special character"),
        body("confirm_password")
            .notEmpty()
            .withMessage("Confirm Password is required"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        const user = await Users.findById(
            req.userId
        );
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }


        const { current_password , new_password , confirm_password } = req.body;

         // Compare passwords
         const passwordMatchOld = await bcrypt.compare(current_password, user.password);
         if (!passwordMatchOld) {
             return res
                 .status(200)
                 .json({ status: false, message: "Invalid password" });
         }

        // Check if New and Confirm password matches
        const passwordMatch =
        new_password === confirm_password ? true : false;
        if (!passwordMatch) {
            return res
                .status(200)
                .json({ status: false, message: "Password Does not Match" });
        }

        // If validation passes, proceed with your logic
        const hashedNewPassword = await bcrypt.hash(new_password, 10); // 10 is the salt rounds

        user.password = hashedNewPassword;

        // Save the updated user details
        user
            .save()
            .then(() =>
                res.json({ status: true, message: "Password Updated successfully!" })
            )
            .catch((err) =>
                res.status(200).json({ status: false, message: err.message })
            );
    }
);

router.get("/users_list", verifyToken, async (req, res) => {
    try {
        // Fetch user profile
        const user = await Users.find();
        return res.status(200).json({ status: true, data: user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

router.post(
    "/change_userstatus",
    verifyToken,
    [
        // validation checks
        body("status").notEmpty().withMessage("Status is required"),
        body("email").notEmpty().withMessage("Email is required"),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Extracting custom error messages from validation errors
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(200).json({ status: false, message: errorMessages });
        }

        const { status , email } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        user.status = status;

        // Save the updated user details
        user
            .save()
            .then(() =>
                res.json({ status: true, message: "Status Updated successfully!" })
            )
            .catch((err) =>
                res.status(200).json({ status: false, message: err.message })
            );
    }
);

module.exports = router;
