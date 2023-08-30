import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teams from '../database/models/teams'
import mockTeams from './mocks/mockTeams'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Routes of Teams', () => {
    beforeEach(() => {
        sinon.restore();
    })

    it('Test if getting all teams' , async () => {
        sinon.stub(teams, 'findAll').resolves(mockTeams as []);
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockTeams);
    });

    it('Test if getting a team by id' , async () => {
        sinon.stub(teams, 'findByPk').resolves(mockTeams[0] as any);
        const response = await chai.request(app).get('/teams/1');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockTeams[0]);
    });


})

