var app = require("./app");
var port = process.env.port || 3000;
var bodyParser = require("body-parser");

var server = app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
