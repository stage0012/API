
var express = require('express');
 
var studentController = require('../src/student/studentController');

const router = express.Router();
 
router.route('/student/login').post(studentController.loginStudentControllerFn);
router.route('/student/create').post(studentController.createStudentControllerFn);
 

const upload = require('../src/event/eventService');
const { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } = require('../src/event/eventController');

// middleware
// router.use(upload.single('image'));

// routes
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);



module.exports = router;




