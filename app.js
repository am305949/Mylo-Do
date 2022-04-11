const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8080

require('./database/mongoose');

const userRouter = require("./database/routes/userRoutes");
const todoRouter = require("./database/routes/todoRoutes");
const groupRouter = require("./database/routes/groupRoutes");

app.use(express.json());

app.use(cors());

app.use(["/users", "/"], userRouter);
app.use("/group/:userId/groups", groupRouter);
app.use("/todo/:userId/groups/:groupId", todoRouter);

app.listen(port, () => {
    console.log('server connected on port '+ port);
})
