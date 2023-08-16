const auth = require("../utils/auth");
const util = require("../utils/response");

const verify = (resBody) => {
  if (!resBody.user || !resBody.user.email || !resBody.token) {
    return util.updateResponse(401, {
      verified: false,
      message: "Incorrect request body.",
    });
  }
  const user = resBody.user;
  const token = resBody.token;
  const verification = auth.verifyToken(user.email, token);
  if (!verification.verified) {
    return util.updateResponse(401, verification);
  }
  return util.updateResponse(200, {
    verified: true,
    message: "Success!",
    user: user,
    token: token,
  });
};

module.exports.verify = verify;
