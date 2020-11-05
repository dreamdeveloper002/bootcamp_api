const express = require('express');
const { protect } = require('../middleware/auth')
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse}   = require('../controllers/courses');

const router = express.Router({ mergeParams: true });
const Courses = require('../models/Course');
const advancedResults = require('../middleware/advancedResults')


router
.route('/')
.get(advancedResults(Courses, {
  path: 'bootcamp',
  select: 'name description'
}), getCourses)
.post(protect, addCourse);


router
.route('/:id')
.get(getCourse)
.put(protect, updateCourse)
.delete(protect, deleteCourse);


module.exports=router;
 