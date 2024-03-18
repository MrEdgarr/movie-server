const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const bookingsRouter = require("./routes/booking.routes");
const bookingsDetailRouter = require("./routes/bookingdetail.routes");
const cinemasRouter = require("./routes/cinema.routes");
const citysRouter = require("./routes/city.routes");
const commentsRouter = require("./routes/comments.routes");
const moviesRouter = require("./routes/movie.routes");
const roomsRouter = require("./routes/room.routes");
const schedulesRouter = require("./routes/schedule.routes");
const seatsRouter = require("./routes/seats.routes");
const ticketsRouter = require("./routes/tickets.routes");
const usersRouter = require("./routes/user.routes");
const slideRouter = require("./routes/slide.routes");

const qickbuyRouter = require("./routes/qickbuy.routes");
app.use("/api/v1/qickbuy", qickbuyRouter);

app.use("/api/v1/booking", bookingsRouter);
app.use("/api/v1/bookingdetail", bookingsDetailRouter);
app.use("/api/v1/cinema", cinemasRouter);
app.use("/api/v1/city", citysRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/movie", moviesRouter);
app.use("/api/v1/room", roomsRouter);
app.use("/api/v1/schedule", schedulesRouter);
app.use("/api/v1/seat", seatsRouter);
app.use("/api/v1/tickets", ticketsRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/slide", slideRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running in POST ${PORT}`));
