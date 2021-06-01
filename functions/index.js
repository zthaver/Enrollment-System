const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
  }).then(() => {
    return {
      message: "Success,"+ data.email + "the user has been made an admin",
    };
  }).catch((err) => {
    return err;
  });
});

exports.addStudentRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      student: true,
    });
  }).then(() => {
    return {
      message: "Success,"+ data.email + "the user has been made a student",
    };
  }).catch((err) => {
    return err;
  });
});

exports.addProfessorRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      professor: true,
    });
  }).then(() => {
    return {
      message: "Success,"+ data.email + "the user has been made a student",
    };
  }).catch((err) => {
    return err;
  });
});
