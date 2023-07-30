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
        const data=await crudServicesInstance.getAll(req,next);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched successfully",data.data));
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
        const data=await crudServicesInstance.getOne(req,next);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data fetched successfully",data.data));
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
            const data=await crudServicesInstance.addOne(req,next);
            if(data.data!==null){
                res.status(200).send(sendResponse("Data fetched successfully",data.data));
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
        const data=await crudServicesInstance.updateOne(req,next);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data updated successfully",data.data));
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
        const data=await crudServicesInstance.deleteOne(req,next);
        if(data.data!==null){
            res.status(200).send(sendResponse("Data deleted successfully",data.data));
        }else{
            next(createError(data.status, data.message));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
}

module.exports={getAllRecord, getRecord, addRecord, updateRecord, deleteRecord};