const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const cookieParser= require("cookie-parser")
const WorkOutRoutes=require("./routes/workout.route")
const UserRoutes=require("./routes/user.route")
const GolasRoutes=require("./routes/goal.route")
const ProgramRoute=require("./routes/admin/program.route.js")
require("dotenv").config();
app.use(cookieParser())
const port = process.env.PORT
require("./config/db")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Fitness_Tracker_Application  API',
        version: '1.0.0',
        description: 'API for managing Fitness_Tracker_Application',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/workout.route.js' ,'./routes/goal.route.js','./routes/admin/program.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth",UserRoutes)
app.use("/api/v1/workout",WorkOutRoutes)
app.use("/api/v1/goal",GolasRoutes)
app.use("/api/v1/program",ProgramRoute)
app.get("/",(req,res)=>{
    res.send("<center><h1>Fitness_Tracker_App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111/Fitness_Tracker_App target=_blank>Repository :- Fitness_Tracker_App</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))