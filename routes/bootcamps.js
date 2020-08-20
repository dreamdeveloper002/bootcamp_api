const express = require('express');
const router = express.Router();
const {getBootcamps, 
       getBootcamp, 
       updateBootcamp, 
       deleteBootcamp, 
       createBootcamp}   = require('../controllers/bootcamp')

// router.get('/', getBootcamps);
 
// router.get('/:id', getBootcamp);
 
// router.post('/', createBootcamp);
 
// router.put('/:id', updateBootcamp);
 
// router.delete('/:id', deleteBootcamp);

router
.route('/')
.get(getBootcamps)
.post(createBootcamp)
  
router
.route('/:id')
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp)

module.exports = router