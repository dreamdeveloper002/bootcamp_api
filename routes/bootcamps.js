const express = require('express');
const {getBootcamps, 
       getBootcamp, 
       updateBootcamp, 
       deleteBootcamp, 
       createBootcamp,
       getBootcampsInRadius}   = require('../controllers/bootcamp')


//Include other resource router
const courseRouter = require('./courses');


const router = express.Router();  

// RE-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
.route('/')
.get(getBootcamps)
.post(createBootcamp)

router
.route('/radius/:zipcode/:distance')
.get(getBootcampsInRadius)
  
router
.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router