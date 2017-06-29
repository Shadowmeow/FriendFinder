var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//found this online
app.use('/static', express.static("app"));

require('/routing/api-routes.js')(app); 
require('/routing/html-routes.js')(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});