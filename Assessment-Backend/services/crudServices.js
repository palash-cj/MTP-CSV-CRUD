const fs=require("fs");
const csvParser = require('csv-parser');


/**
 * readCSV
 * @returns data from the data.csv file
 */
function readCSV() {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream('./data.csv')
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
}

class CrudServices{

    async getAll(req){
        const data = await readCSV();
        if(data.length===0){
            return {
                data:null,
                status:404,
                message:"Data not found"
            }
        }
        return {data};
    }

    async getOne(req){
        const itemId = req.params.id;
        
        const data = await readCSV();
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

    async addOne(req){
        const newRecord = req.body;

        const data = await readCSV();
        var max=0;
        data.forEach((item)=>{
            if(item.id>max){
                max=item.id;
            }
        })
        newRecord.id = parseInt(max)+1;
        data.push(newRecord);
  
        fs.writeFile('./data.csv', '', () => {
            fs.createWriteStream('./data.csv', { flags: 'a' })
            .write('id,name,age,occupation,city\n'); // Assuming the CSV file has these headers
    
            data.forEach((item) => {
            const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
            fs.createWriteStream('./data.csv', { flags: 'a' }).write(row);
            });
        });
  
        return {
            data:newRecord
        }
    }

    async updateOne(req){
        const itemId = parseInt(req.params.id);
        const updatedRecord = req.body;
        
        const data = await readCSV();
        const index = data.findIndex((item) => parseInt(item.id) === itemId);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedRecord };
    
            fs.writeFile(csvFilePath, '', () => {
                fs.createWriteStream(csvFilePath, { flags: 'a' })
                    .write('id,name,age,occupation,city\n');
                data.forEach((item) => {
                    const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
                    fs.createWriteStream(csvFilePath, { flags: 'a' }).write(row);
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

    async deleteOne(req){
        const itemId = parseInt(req.params.id);
        
        const data = await readCSV();
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