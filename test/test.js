import { should, use, request } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/app';
import pool from '../server/models/pool';

should();
use(chaiHttp);

process.env.NODE_ENV === 'test';

describe('Test suites', () => {
  after(() => {
    pool
      .query(
        `
        DELETE FROM users WHERE email = 'c@gmail.com';`
      )
      .then()
      .catch();
  });
  after(() => {
    pool
      .query(
        `
        DELETE FROM bookings WHERE email = 'j@gmail.com';`
      )
      .then()
      .catch();
  });
  context('POST /auth/signup', () => {
    it('should signup new user', done => {
      const user = {
        first_name: 'a',
        last_name: 'b',
        email: 'c@gmail.com',
        password: 'defghi'
      };
      request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return error if user already exists', done => {
      const user = {
        first_name: 'a',
        last_name: 'b',
        email: 'c@gmail.com',
        password: 'defghi'
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
    it('should signin registered user', done => {
      const user = {
        email: 'c@gmail.com',
        password: 'defghi'
      };
      request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return error if email is wrong', done => {
      const user = {
        email: 'q@gmail.com',
        password: 'defghi'
      };
      request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should return error if password is wrong', done => {
      const user = {
        email: 'c@gmail.com',
        password: 'nmopqrst'
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
  context('POST /bookings/createBooking', () => {
    it('should create new booking', done => {
      const booking = {
        booking_id: '1',
        bus_id: '1',
        seat_number: '1',
        first_name: 'f',
        last_name: 'g',
        email: 'j@gmail.com'
      };
      request(server)
        .post('/api/v1/bookings/')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .send(booking)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should return error if email is used already', done => {
      const booking = {
        booking_id: '1',
        bus_id: '1',
        seat_number: '1',
        first_name: 'f',
        last_name: 'g',
        email: 'j@gmail.com'
      };
      request(server)
        .post('/api/v1/bookings')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .send(booking)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  context('GET /bookings/getBookings', () => {
    it('should get all bookings', done => {
      const booking = {
        booking_id: '1',
        bus_id: '1',
        seat_number: '1',
        first_name: 'f',
        last_name: 'g',
        email: 'j@gmail.com'
      };
      request(server)
        .get('/api/v1/bookings/')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .send(booking)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  context('DELETE /bookings/deleteBookings', () => {
    it('should delete a booking', done => {
      const booking = {
        booking_id: '1',
        bus_id: '1',
        seat_number: '1',
        first_name: 'f',
        last_name: 'g',
        email: 'j@gmail.com'
      };
      request(server)
        .delete('/api/v1/bookings/1')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
  context('POST /trips/createTrip', () => {
    it('should create new trip', done => {
      const trip = {
        bus_id: '3',
        origin: 'Benin',
        destination: 'Lagos',
        fare: '5000'
      };
      request(server)
        .post('/api/v1/trips/')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .send(trip)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  context('GET /trips/getTrips', () => {
    it('should get all trips', done => {
      const trip = {
        bus_id: '3',
        origin: 'Benin',
        destination: 'Lagos',
        fare: '5000'
      };
      request(server)
        .get('/api/v1/trips/')
        .set(
          'token',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
        )
        .send(trip)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      context('PATCH /trips/updateTrips', () => {
        it('should cancel a trip', done => {
          const trip = {
            bus_id: '3',
            origin: 'Benin',
            destination: 'Lagos',
            fare: '5000'
          };
          request(server)
            .patch('/api/v1/trips/9')
            .set(
              'token',
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIl9lbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIl9pc2FkbWluIjpmYWxzZSwiaWF0IjoxNTYzMjMwNDIwfQ.3F34ikIk94ZEmZ5F9CXkgvTJ1UMextWEb-ss9saBNL8'
            )
            .send(trip)
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
        });
      });
    });
  });
});
