const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get All Record', () => {
  // Test GET /file
  describe('GET /file', () => {
    it('should return status 200 and the correct message', (done) => {
      chai
        .request(app)
        .get('/file')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            "success": true,
            "message": "Data fetched sucessfully",
            "data": [
                {
                    "id": "1",
                    "name": "John",
                    "age": "22",
                    "occupation": "Software Developer",
                    "city": "New York"
                }
            ]
        });
          done();
        });
    });
  });

  // Test POST, PUT, DELETE, or other API routes if applicable
});


