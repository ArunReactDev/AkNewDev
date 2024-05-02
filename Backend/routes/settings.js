const express = require("express");
const router = express.Router();
const CommonSettings = require("../models/commonSettings"); // Import model from separate folder
const {
  verifyToken
} = require("../helpers/helper");
const { body, validationResult } = require("express-validator");

router.post(
    "/update_settings",
    verifyToken,
    [
        // validation checks
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

        const {type} = req.body;
        
        const commonSettings = await CommonSettings.findOne();
        if(type === '0') {
          // Update the plan_details field with the new data from the request body
          commonSettings.trial_period = req.body.trial_period;
          // Save the updated document
         }
        else {
           // Update the plan_details field with the new data from the request body
          // commonSettings.plan_details = req.body.plan_details;
          // Save the updated document
          if(req.body.method === '1') {
            // update
            let tempArr = commonSettings.plan_details;
            if(tempArr && tempArr.length > 0) {
              tempArr.map(item => {
                let itemsId = item._id.toString();
                 if(itemsId === req.body.id) {
                  item.plantitle = req.body.plantitle;
                  item.description = req.body.description;
                  item.monthly = req.body.monthly;
                  item.buttonText = req.body.buttonText;
                  item.buttonClass = req.body.buttonClass;
                  item.noOfMonths = req.body.noOfMonths;
                  item.featureHeading = req.body.featureHeading;
                  item.features = req.body.features;
                  console.log("check3 ," , item)
                }
              })
            }
            commonSettings.plan_details = tempArr;
          }
          else {
            // add
            let tempArr = commonSettings.plan_details;
            let obj = {plantitle , description , monthly , buttonText , buttonClass , noOfMonths , featureHeading , features}
            tempArr.push(obj);
            commonSettings.plan_details = tempArr;
          }
        }

      // If validation success, continue with your logic
    
      await commonSettings.save();   
  
      // Respond with success message
      res.json({
        status: true,
        message: `Settings updated successfully.`,
      });

    }
);

router.get(
  "/get_settings",
  async (req, res) => {
    try {
        // If validation success, continue with your logic
        const commonSettings = await CommonSettings.find();
        // Update the plan_details field with the new data from the request body
        return res.json({
          status: true,
          data: commonSettings[0],
        });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({ status: false, message: "Internal Server Error" });
    }

  }
);
  
module.exports = router;  