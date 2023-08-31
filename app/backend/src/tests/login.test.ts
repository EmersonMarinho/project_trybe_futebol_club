import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/users'
import mockUser from './mocks/mockUser'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Routes of Login', () => {
    beforeEach(() => {
        sinon.restore();
    })

    it('Test if login is working' , async () => {
        sinon.stub(user, 'findOne').resolves(mockUser as any);
        const response = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: "secret_admin"});
        expect(response.status).to.be.equal(200);
    });

    it('Test if login is not working' , async () => {
        sinon.stub(user, 'findOne').resolves(mockUser as any);
        const response = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: "secret_admin1"});
        expect(response.status).to.be.equal(401);
    });

    it('Test if getRole is not working' , async () => {
        sinon.stub(user, 'findOne').resolves(mockUser as any);
        const response = await chai.request(app).post('/getRole').send({email: 'admin@admin.com'});
        expect(response.status).to.be.equal(404);
    });
})