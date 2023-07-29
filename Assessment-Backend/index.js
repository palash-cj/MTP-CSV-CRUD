const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const multer=require('multer');
const upload=multer();

const crudRoute=require('./routes/crudRoute');

const app = express();
const csvFilePath = path.join(__dirname, 'data.csv');

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

// Helper function to read the CSV file and return the data as an array of objects
function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// GET all items
app.get('/items', async (req, res) => {
    try {
      const data = await readCSV();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read CSV file' });
    }
  });
  
  // GET single item by ID
  app.get('/items/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    try {
      const data = await readCSV();
      const item = data.find((item) => item.id === itemId);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to read CSV file' });
    }
  });
  
  // POST new item
  app.post('/items', upload.none(), async (req, res) => {
    const newItem = req.body;
    console.log(newItem)
    try {
      const data = await readCSV();
     var max=0;
        data.forEach((item)=>{
            if(item.id>max){
                max=item.id;
            }
        })
      newItem.id = parseInt(max)+1;
      data.push(newItem);
  
      fs.writeFile(csvFilePath, '', () => {
        fs.createWriteStream(csvFilePath, { flags: 'a' })
          .write('id,name,age,occupation,city\n'); // Assuming the CSV file has these headers
  
        data.forEach((item) => {
          const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
          fs.createWriteStream(csvFilePath, { flags: 'a' }).write(row);
        });
      });
  
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to write to CSV file' });
    }
  });
  
  // PUT update item by ID
  app.put('/items/:id', upload.none(), async (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    console.log(updatedItem)
    try {
      const data = await readCSV();
      const index = data.findIndex((item) => parseInt(item.id) === itemId);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem };
  
        fs.writeFile(csvFilePath, '', () => {
            console.log("!!!!!!!!!!!!!!");
          fs.createWriteStream(csvFilePath, { flags: 'a' })
            .write('id,name,age,occupation,city\n'); // Assuming the CSV file has these headers
            console.log("@@@@@@@@@@@@@@@@@@");
          data.forEach((item) => {
            const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
            fs.createWriteStream(csvFilePath, { flags: 'a' }).write(row);
          });
          console.log("#########")
        });
  
        res.json(data[index]);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to write to CSV file' });
    }
  });
  
  // DELETE item by ID
  app.delete('/items/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    try {
      const data = await readCSV();
      const index = data.findIndex((item) => parseInt(item.id) === itemId);
      if (index !== -1) {
        const deletedItem = data.splice(index, 1)[0];
  
        fs.writeFile(csvFilePath, '', () => {
          fs.createWriteStream(csvFilePath, { flags: 'a' })
            .write('id,name,age,occupation,city\n'); // Assuming the CSV file has these headers
  
          data.forEach((item) => {
            const row = `${item.id},${item.name},${item.age},${item.occupation},${item.city}\n`;
            fs.createWriteStream(csvFilePath, { flags: 'a' }).write(row);
          });
        });
  
        res.json({deletedItem, message:"Item Deleted"});
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to write to CSV file' });
    }
  });
  

// Define your CRUD operations below

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
