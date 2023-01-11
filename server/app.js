var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { create } = require("express-handlebars");
var indexRoute = require("./routes/index.js");

var app = express();

const hbs = create({
    //config
    encoding: "utf8",
    extname: `.handlebars`,
    layoutsDir: path.join(__dirname, "views/layout"),
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {},
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
});
// view engine setup
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);

app.use("/qna", require("./routes/qnaRoute"));

app.use("/Booking", require("./routes/BookingRoute"));

app.use("/Booking-details", require("./routes/Booking-detailsRoute"));

app.use("/findticked", require("./routes/findtickedRoute"));
app.use("/ticketinfo", require("./routes/ticketinfoRoute"));
app.get("/createTable", (req, res) => {
    let model = require("./models");
    model.sequelize.sync().then(() => {

        res.send('table create');

    })
})
// test các hàm database xem có chạy dc ko 
app.use('/api/benxe', require("./routes/benxe"));
app.use('/api/user', require("./routes/user"));
app.use('/api/khachhang', require("./routes/khachhang"));
app.use('/api/nhaxe', require("./routes/nhaxe"));

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404 Error" });
});

module.exports = app;