const express = require('express');
const { protect } = require('../middleware/auth')
const {getBootcamps, 
       getBootcamp, 
       updateBootcamp, 
       deleteBootcamp,  
       createBootcamp,
       getBootcampsInRadius,
       bootcampPhotoUpload}   = require('../controllers/bootcamp')

const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')
//Include other resource router
const courseRouter = require('./courses');


const router = express.Router();  

// RE-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(protect, bootcampPhotoUpload)

router
.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
.post(protect, createBootcamp)

router
.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius)
  
router
.route('/:id')
.get(getBootcamp)
.put(protect, updateBootcamp)
.delete(protect, deleteBootcamp)

module.exports = router