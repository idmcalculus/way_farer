import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/app';


should();
use(chaiHttp);

process.env.NODE_ENV === 'test';

describe('Test suites', () => {
    context('POST /auth/signup', () => {
        it('should signup new user', (done) => {
            const user = {
                first_name: 'a',
                last_name: 'b',
                email: 'c@gmail.com',
                password:'defghi',
                };
            request(server)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            });
        });
        it('should return error if user already exists', (done) => {
            const user = {
                first_name: 'a',
                last_name: 'b',
                email: 'c@gmail.com',
                password:'defghi',
                };
            request(server)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
            });
        });
    });
    context('POST /auth/signin', () => {
        it('should signin registered user', (done) => {
            const user = {
                email: 'c@gmail.com',
                password:'defghi',
                };
            request(server)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            });
        });
        it('should return error if email is wrong', (done) => {
            const user = {
                email: 'q@gmail.com',
                password:'defghi',
                };
            request(server)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            });
        });
        it('should return error if password is wrong', (done) => {
            const user = {
                email: 'c@gmail.com',
                password:'nmopqrst',
                };
            request(server)
                .post('/api/v1/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
            });
        });
    });
});