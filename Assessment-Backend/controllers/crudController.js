const CrudServices=require("../services/crudServices");
const crudServicesInstance=new CrudServices();
const createError=require("../utils/error");
const sendResponse  = require("./baseController");


/**
 * getAllRecord
 * @param {*} req 
 * @param {Data} res 
 * @param {Error} next 
 */
const getAllRecord=async(req,res,next)=>{
    try {
        const data=await crudServicesInstance.getAll(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched sucessfully",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * getRecord
 * @param {id} req 
 * @param {Data} res 
 * @param {Error} next 
 */
const getRecord=async(req,res,next)=>{
    try {
        const data=await crudServicesInstance.getOne(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched sucessfully",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}


/**
 * addRecord
 * @param {name, age, occupation, city} req 
 * @param {Success message} res 
 * @param {Error} next 
 */
const addRecord=async(req,res,next)=>{
    try {
        if(req.body.name!==undefined && req.body.name!==""){
            const data=await crudServicesInstance.addOne(req);
            if(data.data!==null){
                res.status(200).send(sendResponse("Data fetched sucessfully",data.data));
            }else{
                next(createError(data.status, data.message));
            }
        }else{
            next(createError(400, "name required"));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}


/**
 * getAllRecord
 * @param {name, age, occupation, city} req 
 * @param {Success message} res 
 * @param {Error} next 
 */
const updateRecord=async(req,res,next)=>{
    try {
        const data=await crudServicesInstance.updateOne(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched sucessfully",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * deleteRecord
 * @param {id} req 
 * @param {Success} res 
 * @param {Error} next 
 */
const deleteRecord=async(req,res,next)=>{
    try {
        const data=await crudServicesInstance.deleteOne(req);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched sucessfully",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

module.exports={getAllRecord, getRecord, addRecord, updateRecord, deleteRecord};