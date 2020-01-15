const supertest = require('supertest');
const app = require('../app');
const {expect} = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an("array");
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Rating', 'Reviews', 'Size', 'Type', 'Genres'
                );
            });
    })
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'NOPE' })
            .expect(400, 'Sort must be either Rating or App')
    })
    it('should sort by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=> {
                expect(res.body).to.be.an('array')
                let sorted = true;

                let i = 0;
                while (i < res.body.length -1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i +1]
                    if (appAtIPlus1.Rating > appAtI.Rating) {
                        sorted = false;
                        break;
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
    it('should sort by App', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'App' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=> {
                expect(res.body).to.be.an('array')
                let sorted = true;

                let i = 0;
                while (i < res.body.length -1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i +1]
                    if (appAtIPlus1.App > appAtI.App) {
                        sorted = false;
                        break;
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
    it('should filter by Genres', () => {
        return supertest(app)
            .get('/apps')
            .query({ Genres: 'Puzzle' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res=> {
                expect(res.body).to.an('array')
                let filtered = true;

                let i = 0;
                while (i < res.body.length -1) {
                    if(res.body[i].Genres != 'Puzzle') {
                        filtered = false;
                        break;
                    }
                    i++
                }
            })
    })
});