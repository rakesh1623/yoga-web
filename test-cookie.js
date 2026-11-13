// test-cookie.js
const cookie = require('cookie');

const rawCookie = "emailOtp=741438; Path=/; HttpOnly";
const parsedCookie = cookie.parse(rawCookie);

console.log("Parsed Cookie:", parsedCookie);
