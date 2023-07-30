const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {

  describe('Get All Records /file', () => {
    it('should return status 200 and the correct message OR return 404 if data not found', (done) => {
      chai
        .request(app)
        .get('/file')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({
            "success": false,
            "status": 404,
            "message": "Data not found"
        });
          done();
        });
    });
  });

  describe('POST a new record /file', () => {
    it('should create a new item and return the correct response data', (done) => {
      const newItem = {
        name: 'John',
        age: 22,
        occupation: 'Software Developer',
        city: 'New York',
      };

      chai
        .request(app)
        .post('/file')
        .send(newItem)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Data fetched successfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('name', newItem.name);
          expect(res.body.data).to.have.property('age', newItem.age);
          expect(res.body.data).to.have.property('occupation', newItem.occupation);
          expect(res.body.data).to.have.property('city', newItem.city);
          expect(res.body.data).to.have.property('id').to.be.a('number');

          done();
        });
    });

  // Test POST, PUT, DELETE, or other API routes if applicable
  });

  describe('GET one file /file/:id', () => {
    it('should return status 200 and the correct message', (done) => {
      chai
        .request(app)
        .get('/file/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            "success": true,
            "message": "Data fetched successfully",
            "data": 
                {
                    "id": "1",
                    "name": "John",
                    "age": "22",
                    "occupation": "Software Developer",
                    "city": "New York"
                }
        });
          done();
        });
    });

  });

  describe('PUT /file/:id', () => {
    it('should update an existing item and return the correct response data', (done) => {
     
      const itemId = 1;
      const updatedData = {
        name: 'Updated John',
        age: 25,
        occupation: 'Senior Software Developer',
        city: 'San Francisco',
      };

      chai
        .request(app)
        .put(`/file/${itemId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Data updated successfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('name', updatedData.name);
          expect(res.body.data).to.have.property('age',updatedData.age);
          expect(res.body.data).to.have.property('occupation', updatedData.occupation);
          expect(res.body.data).to.have.property('city', updatedData.city);

          expect(Number(res.body.data.id)).to.equal(itemId);

          done();
        });
    });


  });

  describe('DELETE one record /file/:id', () => {
    it('should return status 200 and the correct message', (done) => {
      chai
        .request(app)
        .delete('/file/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            success: true,
            message: 'Data deleted successfully',
            data: 'Record deleted!'
          });
          done();
        });
    });
  });
  

});

