const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;


const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath =  path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath)


app.get("/", (req, res) => {
    res.render("index", {
        active1: "active"
    });
});


app.get("/weather", (req, res) => {
    res.render("weather", {
        active2: "active"
    })
});


app.get("/about", (req, res) => {
    res.render("about", {
        active3: "active"
    });
});


app.get("*", (req, res) => {
    res.render("404error", {
        errorMsg: "Oops! Page not found..."
    })
});


app.listen(port, () => console.log(`Server started at port ${port}`));