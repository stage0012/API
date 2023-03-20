const studentModel = require('./studentModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.createStudentDBService = (studentDetails) => {
  return new Promise((resolve, reject) => {
    if (!studentDetails.firstname || !studentDetails.password) {
      reject({ status: false, message: "firstname and password fields are required." });
    } else {
      const studentModelData = new studentModel();
      studentModelData.firstname = studentDetails.firstname;
      studentModelData.email = studentDetails.email;
      studentModelData.password = studentDetails.password;

      bcrypt.hash(studentDetails.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          studentModelData.password = hash;
          studentModelData
            .save()
            .then((result) => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    }
  });
};


module.exports.loginStudentDBService = (studentDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await studentModel.findOne({ email: studentDetails.email });
      if (result) {
        const isMatch = await bcrypt.compare(studentDetails.password, result.password);
        if (isMatch) {
          resolve({ status: true, msg: "Student Validated Successfully" });
        } else {
          reject({ status: false, msg: "Student Validation failed" });
        }
      } else {
        reject({ status: false, msg: "Student Error Details" });
      }
    } catch (error) {
      reject({ status: false, msg: "Invalid Data" });
    }
  });
};
