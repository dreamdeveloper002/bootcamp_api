const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp')



//@desc   Get all bootcamps
//@route  GET  /api/v1/bootcamps
//@access public 

exports.getBootcamps = asyncHandler(async (req, res, next) => {
   
   let query;
   //copy req.query
   const reqQuery = {...req.query}

   //create query string
   let qeuryStr = JSON.stringify(reqQuery);

   //fields to exclude
   const removeField = ['select', 'sort', 'page', 'limit'];
   
   //loop over remove fields and delete from reqQuery
   removeField.forEach(param => delete reqQuery[param]);

   //Create operators ($gt, $gte, etc)
   qeuryStr = qeuryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
  
   //finding resources
   query = Bootcamp.find(JSON.parse(qeuryStr));

   //select fields
   if(req.query.select) {
     const fields = req.query.select.split(',').join(' ');
     query = query.select(fields)
   }
  
   //sort fields
   if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  } else {
    
    query = query.sort('-createdAt');
  }


  //pagination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);
 
   const bootcamps = await query;
  
   const pagination = {};

   if (endIndex < total) {
     pagination.next = {
       page: page + 1,
       limit
     }
   }


   if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  } 
      res.status(200).json({
          success : true,
          count : bootcamps.length,
          pagination,
          data: bootcamps
      })
 
})


//@desc   Get single bootcamp by ID
//@route  GET  /api/v1/bootcamps/:id
//@access public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
   
    const bootcamp = await Bootcamp.findById(req.params.id)

       if(!bootcamp){

      return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
      
    }
       res.status(200).json({
           success : true,
           data: bootcamp
       })
  
})


//@desc   create new bootcamp
//@route  POST /api/v1/bootcamps
//@access private

exports.createBootcamp = asyncHandler( async (req, res, next) => {
   
    const bootcamp = await Bootcamp.create(req.body)
   res.status(201).json({
        success: true,
        data: bootcamp
    })
  
  })


//@desc   update bootcamps by ID
//@route  PUT /api/v1/bootcamps/:id
//@access private

exports.updateBootcamp = asyncHandler( async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
          
          if(!bootcamp) {
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
          }
        res.status(200).json({ 
            success : true,
            data : bootcamp
        })
    
})



//@desc   delete bootcamps by ID
//@route  DELETE /api/v1/bootcamps/:id
//@access private

exports.deleteBootcamp = asyncHandler (async (req, res, next) => {

      const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)   
              
        if(!bootcamp) {
            return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
              }
            res.status(200).json({ 
                success : true,
                data : {}
            })

});



//@desc   get bootcamps within a radius
//@route  GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access private

exports.getBootcampsInRadius = asyncHandler (async (req, res, next) => {

    const { zipcode, distance } = req.params;

    //get lat and log from geocoder;

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
 
    //calc radius using radians
    //divide dis by radius of earth
    //earth radius = 3,963mi / 6,378km

const radius = distance / 3963

const bootcamps = await Bootcamp.find({
  location : { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }}
});


res.status(200).json({
  success: true,
  count: bootcamps.length,
  data: bootcamps

})

});


