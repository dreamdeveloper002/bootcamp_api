

//@desc   Get all bootcamps
//@route  GET  /api/v1/bootcamps
//@access public 

exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg:'Show all bootcamps'})
}


//@desc   Get single bootcamp by ID
//@route  GET  /api/v1/bootcamps/:id
//@access public

exports.getBootcamp = (req, res, next) => {
   
   
    res.status(200).json({success: true, msg:`Show bootcamp ${req.params.id}`})
    

}


//@desc   create new bootcamp
//@route  POST /api/v1/bootcamps
//@access private

exports.createBootcamp = (req, res, next) => {
   
    res.status(200).json({success: true, msg:'Create new bootcamps' })

}


//@desc   update bootcamps by ID
//@route  PUT /api/v1/bootcamps/:id
//@access private

exports.updateBootcamp = (req, res, next) => {

    res.status(200).json({success: true, msg:`Update bootcamp ${req.params.id}`})
}



//@desc   delete bootcamps by ID
//@route  DELETE /api/v1/bootcamps/:id
//@access private

exports.deleteBootcamp = (req, res, next) => {

    res.status(200).json({success: true, msg:`Delete bootcamp ${req.params.id}`})
}