var expect = require('chai').expect;
var request = require('request');

describe('Database Access', () => {
  describe('Find Active Tasks', () => {
    it('status and check body', (done) => {
      request('http://localhost:3001/tasks/activeTasks/Bob', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('[{"_id":"5bbf3eb51a7e8e19e8498468","taskName":"Test from Postman","description":"test form","dueDate":"2018-11-11T00:00:00.000Z","completed":false,"createdBy":"Bob","createdAt":"2018-10-11T12:14:45.387Z","updatedAt":"2018-10-11T12:14:45.387Z","__v":0}]');
        done();
      });
    });
  });
  describe('Find completed Tasks', () => {
    it('status and check body', (done) => {
      request('http://localhost:3001/tasks/completeTasks/Bob', (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('[]');
        done();
      });
    });
  });
});
