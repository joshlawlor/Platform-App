const registerUser = require("./authServices/register");
const loginUser = require("./authServices/login");

const healthPath = "/health";
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verified";




exports.handler = async (e) => {
  console.log("Request Event:", e);
  let response = {
    isBase64Encoded: true | false,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(200),
  };

  if (e.httpMethod === "GET" && e.path === healthPath) {
    return response;
  } else if (e.httpMethod === "POST" && e.path === registerPath) {
    //to grab the request body
    const registerBody = JSON.parse(e.body);
    //for dyanamodb we want to use async functions
    return (response = await registerUser.register(registerBody));
  } else if (e.httpMethod === "POST" && e.path === loginPath) {
    const loginBody = JSON.parse(e.body);
    return (res = await loginUser.login(loginBody));
  } else if (e.httpMethod === "POST" && e.path === verifyPath) {
    return response;
  } else {
    response = buildResponse(404, "404 Not Found");
  }
  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
