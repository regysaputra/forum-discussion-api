const app = require("./Infrastructures/http/app");

app.listen(3000, () => console.log("server ready on port 3000."));

module.exports = app;