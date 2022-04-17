/**
 * code to create the _redirect file in the dist folder in order to handle routes for SPA in netlify
 */
const fs = require("fs");
fs.writeFileSync("./dist/_redirects", `/*    /index.html  200`)