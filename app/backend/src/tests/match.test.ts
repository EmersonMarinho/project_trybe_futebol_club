import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import match from '../database/models/matches'
import mockMatch from './mocks/mockMatch'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Matches', () => {
    beforeEach(() => {
        sinon.restore();
    })

    it('Test if getting all matches' , async () => {
        sinon.stub(match, 'findAll').resolves(mockMatch as any);
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockMatch);
    });

    it('Test if getting a match by id' , async () => {
        sinon.stub(match, 'findByPk').resolves(mockMatch[0] as any);
        const response = await chai.request(app).get('/matches/1');
        expect(response.status).to.be.equal(404);
    });

    it('Test if is it able to create a match', async () => {
        sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
        sinon.stub(match, 'create').resolves({} as any);
    
        const response = await chai.request(app).post('/matches').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
        .send({
          homeTeamId: 2,
          awayTeamId: 5,
          homeTeamGoals: 0,
          awayTeamGoals: 0,
          inProgress: true,
        });
        expect(response.status).to.be.equal(201);
      });
    
      it('if its possible to update a match', async () => {
        sinon.stub(jwt, 'verify').returns({ email: 'admin@admin.com'} as any);
        sinon.stub(match, 'update').resolves({} as any);
    
        const response = await chai.request(app).patch('/matches/1').set('authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY5MzMzMTg2OX0.URUBT44FANWqg7jOLh0-jfs0T5SJMI8snhYaDSSopLo')
        .send({
          homeTeamId: 5,
          awayTeamId: 2,
          homeTeamGoals: 3,
          awayTeamGoals: 0,
          inProgress: true,
        });
        expect(response.status).to.be.equal(200);
      });


})

