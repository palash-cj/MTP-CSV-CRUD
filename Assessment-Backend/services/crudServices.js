const fs=require("fs");
const csvParser = require('csv-parser');
const createError=require("../utils/error")

/**
 * readCSV
 * @returns data from the data.csv file
 */
function readCSV(next) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync('./data.csv')) {
        next(createError(404, "Data not found"))
      } else {
        const results = [];
        fs.createReadStream('./data.csv')
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      }
    });
  }
  

class CrudServices{

    async getAll(req,next){
        const data = await readCSV(next);
        if(data.length===0){
            return {
                data:null,
                status:404,
                message:"Data not found"
            }
        }
        return {data};
    }

    async getOne(req,next){
        const itemId = req.params.id;
        
        const data = await readCSV(next);
        const record = data.find((item) => item.id === itemId);
        if (record) {
            return {
                data:record
            }
        } else {
            return {
                data:null,
                status:400,
                message:"Record not found"
            }
        }
    }

    async addOne(req,next) {
        const newRecord = req.body;
      
        if (!fs.existsSync('./data.csv')) {
          fs.writeFileSync('./data.csv', 'id,name,age,occupation,city\n');
        }
      
        const data = await readCSV(next);
        var max = 0;
        data.forEach((item) => {
          if (item.id > max) {
            max = item.id;
          }
        });
        newRecord.id = parseInt(max) + 1;
        data.push(newRecord);
      
        fs.writeFileSync('./data.csv', '');
        fs.createWriteStream('./data.csv', { flags: 'a' }).write('id,name,age,occupation,city\n'); 
        data.forEach((item) => {
          const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
          fs.createWriteStream('./data.csv', { flags: 'a' }).write(row);
        });
      
        return {
          data: newRecord,
        };
      }


    async updateOne(req,next){
        const itemId = parseInt(req.params.id);
        const updatedRecord = req.body;
        
        const data = await readCSV(next);
        const index = data.findIndex((item) => parseInt(item.id) === itemId);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedRecord };
    
            fs.writeFile('./data.csv', '', () => {
                fs.createWriteStream('./data.csv', { flags: 'a' })
                    .write('id,name,age,occupation,city\n');
                data.forEach((item) => {
                    const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
                    fs.createWriteStream('./data.csv', { flags: 'a' }).write(row);
                });
            });
    
            return {
                data:data[index]
            }
        } else {
            return {
                data:null,
                status:400,
                message:"Record not found"
            }
        }
    } 

    async deleteOne(req,next){
        const itemId = parseInt(req.params.id);
        
        const data = await readCSV(next);
        const index = data.findIndex((item) => parseInt(item.id) === itemId);
        if (index !== -1) {
            const deletedItem = data.splice(index, 1)[0];
    
            fs.writeFile('./data.csv', '', () => {
            fs.createWriteStream('./data.csv', { flags: 'a' })
                .write('id,name,age,occupation,city\n'); // Assuming the CSV file has these headers
    
            data.forEach((item) => {
                const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
                fs.createWriteStream('./data.csv', { flags: 'a' }).write(row);
            });
            });
    
            return {
                data:"Record deleted!"
            }
        } else {
            return {
                data:null,
                status:400,
                message:"Record not found"
            }
        }
    }
}

module.exports=CrudServices;