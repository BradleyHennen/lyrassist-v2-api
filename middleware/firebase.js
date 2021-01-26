const admin = require("firebase-admin");
const serviceAccount = require("../../Firebase/lyrassist-cd50e-firebase-adminsdk-t90m0-0e9542ef9f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lyrassist-cd50e.firebaseio.com"
});

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    console.log('req', req.authToken);
    // console.log('res', res);

    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      console.log('authToken', authToken);
      console.log('userInfo', userInfo);

      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = { checkIfAuthenticated };