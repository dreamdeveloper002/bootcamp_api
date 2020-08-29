const express = require('express');
const router = express.Router();
const {getBootcamps, 
       getBootcamp, 
       updateBootcamp, 
       deleteBootcamp, 
       createBootcamp,
       getBootcampsInRadius}   = require('../controllers/bootcamp')

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