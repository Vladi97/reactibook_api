// var admin = require("firebase-admin");

module.exports = (req, res, next) => {
  //admin.initializeApp();
  try {
    // const token = req.headers.authorization; // esto elimina el beater del token y toma solo la segunda sección
    // console.log(token);
    // admin
    //   .auth()
    //   .verifyIdToken(token)
    //   .then((decodedToken) => {
    //     console.log(decodedToken.uid);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //   });
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
