
const studentService = require('./studentService');

const createStudentControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    const status = await studentService.createStudentDBService(req.body);
    console.log(status);
 
    if (status) {
      res.send({ status: true, message: 'Student created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch(err) {
    console.log(err);
    res.send({ status: false, message: err.message });
  }
};

const loginStudentControllerFn = async (req, res) => {
  try {
    const result = await studentService.loginStudentDBService(req.body);
    if (result.status) {
      res.send({ status: true, message: result.msg });
    } else {
      res.send({ status: false, message: result.msg });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: error.message });
  }
};

module.exports = { createStudentControllerFn, loginStudentControllerFn };