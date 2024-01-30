import passport from "passport";
import cors from "cors";
import express, { json, static } from "express";
require("./mongodb/mongodb").default;
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
import authRoute from "./routes/authRoute/authRoute";
import cookieSession from "cookie-session";
import userRoute from "./routes/userRoute/userRoute";
import cartRoute from "./routes/cartRoute/cartRoute";
import productRoute from "./routes/productRoute/productRoute";
import blogRoute from "./routes/blogRoute/blogRoute";
import payRoute from "./routes/payRoute/payRoute";
import serviceRoute from './routes/serviceRoute/serviceRoute';
import shipRoute from "./routes/shipRoute/shipRoute";
import reviewRoute from './routes/review/reviewRoute';
import orderRoute from "./routes/orderRoute/orderRoute";
// const googleAuthRoute = require("./routes/googleAuthRoute/googleAuthRoute");
// const path = require("path");
import graphRoute from './routes/graphRoute/graphRoute';
// require('./middleware/passport')(passport);

app.use(json());
app.use(cors())
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const _dirname = path.dirname("")
// const buildPath = path.join(_dirname, "../client/build");

// app.use(express.static(buildPath))

// app.get("/*", function (req, res) {

//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );

// })

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", authRoute);
// app.use('/googleAuth', googleAuthRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", blogRoute);
app.use("/api", cartRoute);
app.use("/api/pay", payRoute);
app.use("/api", orderRoute);
app.use("/api/ship", shipRoute);
app.use("/api", serviceRoute);
app.use("/api", reviewRoute);
app.use("/api" , graphRoute)

app.use(static("public"));
app.get("/:file", (req, res) => {
  res.sendFile(__dirname + `/public/images/${req.params.file}`);
});

app.get("/blog/:file", (req, res) => {
  res.sendFile(__dirname + `/public/blog/images/${req.params.file}`);
});

app.get("/service/:file", (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}`);
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT => ${PORT}`);
});
