const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const CouponCode = require("../model/couponCode");
const router = express.Router();

// create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.find({
        name: req.body.name,
      });

      //   console.log(req.body);

      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({
        shop: {
          _id: req.params.id,
        },
      });

      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
