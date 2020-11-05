const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');



//@desc   Register user
//@route  POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler( async (req, res, next) => {
   
  const user = await User.create(req.body)
 res.status(201).json({
      success: true,
      data: user
  })

})