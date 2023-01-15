const mongoose=require("mongoose");
const cors=require("cors");
mongoose.set('strictQuery', true);

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const { connection } = require("./config/db");
const{userRouter}=require("./routes/user.route");
const{noteRouter}=require("./routes/note.route");
const{auth}=require("./middlewares/auth.middleware");

app.use("/user",userRouter);


app.get("/", (req, res) => {
    res.send("WELCOME");
})

app.use(auth);
app.use("/note",noteRouter);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("connected to db");
    } catch (error) {
        console.log("unable to connect to the server");
        console.log(error);
    }
    console.log(`server is running at http://localhost:${process.env.port}`);
})




//  {
//      "title":"Backend",
//      "note":"today is full stack app building",
//      "category":"Live session",
//      "author"Pulkit"
//    }








// app.get("/about", (req, res) => {
//     res.send("about API");
// })

// app.get("/contact", (req, res) => {
//     res.send("Contacts page");
// })

// app.get("/data", (req, res) => {
//     const token = req.headers.authorization;
//     jwt.verify(token, 'masai', (err, decoded) => {
//         if (err) {
//             res.send("invalid token");
//             console.log(err);
//         } else {
//             res.send("Data..");
//         }
//     })
// })

// app.get("/cart", (req, res) => {
//     const token = req.query.token;
//     jwt.verify(token, 'masai', (err, decoded) => {
//         if (err) {
//             res.send("invalid token");
//             console.log(err);
//         } else {
//             res.send("Cart page");
//         }
//     })
// })