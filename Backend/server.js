require("dotenv").config();
const express = require("express");
const { connect } = require("./src/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 3000;
const userRouter = require("./src/routes/user.route.js")
const propertyRouter = require("./src/routes/property.route.js")
const reviewRouter = require("./src/routes/review.route.js")
const bookingRouter = require("./src/routes/booking.route.js")
const adminRouter = require("./src/routes/admin.route.js");
const paymentRouter = require("./src/routes/payment.route.js");

connect();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));


// Setup cors
app.use(cors({
    origin:true,
    credentials:true,
}))


// Routes 
app.use("/api/users",userRouter)
app.use("/api/properties",propertyRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/bookings",bookingRouter)
app.use("/api/admin",adminRouter)
app.use("/api/payments",paymentRouter)






app.use("*",(req,res,next)=>{
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);
})

// Global error handler
app.use(errorHandler);




app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
