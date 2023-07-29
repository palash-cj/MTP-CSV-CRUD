const express=require("express");
const app=express.Router();
const multer=require('multer');
const upload=multer();

const { getAllRecord, getRecord, addRecord, updateRecord, deleteRecord} = require("../controllers/crudController");

app.get('/', getAllRecord);
app.get('/:id',getRecord);
app.post('/', upload.none(), addRecord);
app.put('/:id', upload.none(), updateRecord);
app.delete('/:id', deleteRecord);

module.exports=app;