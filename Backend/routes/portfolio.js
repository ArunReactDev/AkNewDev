const express = require("express");
const router = express.Router();
const MutualFund = require("../models/mutualFunds"); 
const CommonSettings = require("../models/commonSettings"); 
const Users = require("../models/users"); 
const PaymentHistory = require("../models/paymentHistory"); 
const { body, validationResult } = require("express-validator");
const xlsx = require("xlsx");
const { verifyToken , generateOrderReceiptId } = require("../helpers/helper");
const moment = require('moment');
const mongoose = require("mongoose");
const Razorpay = require('razorpay');

const RazorpayInstance = new Razorpay({ key_id: 'rzp_test_3n2x87FxobYHrM', key_secret: 'voPX7wFNNjIqAfg4tKdQEF7Q' })

router.get(
  "/subscription_plans",
  verifyToken,
  async (req, res) => {
    // Check for validation errors
    const commonSettings = await CommonSettings.findOne();
    res.json({
      status : true,
      data : commonSettings.plan_details
    })
  }
);

router.post(
  '/create_order',
  verifyToken,
  [
    // validation checks
    body("amount").notEmpty().withMessage("Amount is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extracting custom error messages from validation errors
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(200).json({ status: false, message: errorMessages });
    }

    let amount = req.body.amount;
    const orderReceiptId = generateOrderReceiptId('order_rcptid_', 5);
    var options = {
      amount: amount,  // amount in the smallest currency unit
      currency: "INR",
      receipt: orderReceiptId
    };
    RazorpayInstance.orders.create(options, function(err, order) {
      if(err) {
       res.json({status : false , message : "Something went wrong during payment"});
       res.end();
       return;
      }
      res.json({status : true , data : order});
      res.end();
      return;
    });

  }
)

router.post(
  "/subscribe",
  verifyToken,
  [
    // validation checks
    body("subscription").notEmpty().withMessage("Plan is required"),
    body("amount").notEmpty().withMessage("Amount is required"),
    body("payment_id").notEmpty().withMessage("Payment Id is required"),
    body("order_id").notEmpty().withMessage("Order Id is required"),
    body("signature").notEmpty().withMessage("Signature is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Extracting custom error messages from validation errors
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ status: false, message: errorMessages });
    }

    // If validation success, continue with your logic
    const user = await Users.findById(
        req.userId,
        "name email mobile_number _id pan_no subscription created_at subscription_start_date subscription_end_date status"
    );

    // If user profile not found, return error
    if (!user) {
        return res.status(200).json({ status: false, message: "User profile not found" });
    }

    const ObjectId = mongoose.Types.ObjectId;
    const planDetailObjectId = new ObjectId(req.body.subscription);

    const commonSettings = await CommonSettings.find();
    const settings = commonSettings[0];
    // Find the specific plan_detail object within the plan_details array
    const planDetail = settings.plan_details.find(detail => detail._id.equals(planDetailObjectId));
    let NoOfMonths = parseInt(planDetail.noOfMonths);
    user.subscription = req.body.subscription;
    const currentDate = new Date();
    const ExpiryDate = new Date();
    user.subscription_start_date = currentDate;
    ExpiryDate.setMonth(ExpiryDate.getMonth() + NoOfMonths);
    user.subscription_end_date = ExpiryDate;
    const newPayment = new PaymentHistory({
      user_id : req.userId,
      amount : req.body.amount,
      payment_id: req.body.payment_id,
      order_id : req.body.order_id,
      signature: req.body.signature,
      subscription : req.body.subscription,
      subscription_start_date : currentDate,
      subscription_end_date : ExpiryDate
    });

    await newPayment.save()
    user
    .save()
    .then(() =>
        res.json({ status: true, message: `you have successfully subscribed to ${planDetail.plantitle} plan!` })
    )
    .catch((err) =>
        res.status(200).json({ status: false, message: err.message })
    );
  }
);

router.get(
  "/payment_history",
  verifyToken,
  async (req, res) => {
    // Check for validation errors
   try {
   
    const aggregatedData = await PaymentHistory.aggregate([
      {
        $addFields: {
          userIdObj: { $toObjectId: "$user_id" } // Convert user_id to ObjectId
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userIdObj",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "commonsettings",
          let: { subscriptionId: { $toObjectId: "$subscription" } }, // Convert subscription to ObjectId format
          pipeline: [
            {
              $unwind: "$plan_details"
            },
            {
              $match: {
                $expr: { $eq: ["$$subscriptionId", "$plan_details._id"] } // Match documents where subscriptionId matches plan_details._id
              }
            }
          ],
          as: "subscriptionDetails"
        }
      },
      {
        $project: {
          _id: 0,
          payment_history: 1,
          amount: 1,
          subscription_start_date: 1,
          subscription_end_date: 1,
          email: "$user.email",
          name: "$user.name",
          subscriptionDetails: { $arrayElemAt: ["$subscriptionDetails.plan_details", 0] } // Extract the first element from the array
        }
      }
    ]);  
    
    // Return the aggregated data
    return res.json({
      status: true,
      data: aggregatedData
    });   

   } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
   }
  }
);

module.exports = router;
