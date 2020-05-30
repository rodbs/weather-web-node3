const express = require("express");
const path = require("path");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Dynamic content
app.get("", (req, res) => {
  res.render("index", {
    title: "Dynamic App",
    name: "Manolo",
  });
});

//Static contet
app.use(express.static(publicDirPath));

// app.get("", (req, res) => {
//   res.send("<h1>HOME</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send("<h1>Help</h1>");
// });
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Boston",
    temperature: "23",
  });
});

app.listen(3000, () => {
  console.log("Server up");
});
