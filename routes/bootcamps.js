const express = require('express');
const { protect, authorize } = require('../middleware/auth')
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
const reviewRouter = require('./reviews');


const router = express.Router();  

// RE-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

router
.route('/')
.get(advancedResults(Bootcamp, 'courses'), getBootcamps)
.post(protect, authorize('publisher', 'admin'), createBootcamp)

router
.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius)
  
router
.route('/:id')
.get(getBootcamp)
.put(protect, authorize('publisher', 'admin'), updateBootcamp)
.delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router