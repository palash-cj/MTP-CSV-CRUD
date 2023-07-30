require('dotenv').config();

const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const multer=require('multer');
const upload=multer();
const cors=require('cors');
const frontend_url=process.env.FRONTEND_URL;

const crudRoute=require('./routes/crudRoute');

const app = express();
const csvFilePath = path.join(__dirname, 'data.csv');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/file', crudRoute);

app.use((err, req, res, next) => {
	const errStatus = err.status || 500;
	const errMessage = err.message || "Something went wrong!!!";
	return res.status(err.status).json({
		success: false,
		status: errStatus,
		message: errMessage
	});
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports=app;