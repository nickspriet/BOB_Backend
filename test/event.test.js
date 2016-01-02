/**
 * Created by Nick on 12/31/15.
 */

var request = require('supertest');
var app = require('../app.js');

describe('Testing events:', function () {

    describe('getAllByUserId', function () {
        it('should return all the events of a specific user', function (done) {
            request(app)
                .get('/event')
                .query({
                    token: '5667e9e67bfac8580ff1df74|8Y17Bnes3_5jcvWMJcAympD'
                })
                .expect('Content-Type', 'application/json')
                .end(function (err, res, body) {
                    if (err) throw err;
                    console.log(res.body);
                    done();
                });
        });
    });
});

