import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Session Testing', () => {
    let cookie

    it('Register new TestUser', async () => {
        const userMock = {
            first_name: 'Coder',
            last_name: 'Test',
            email: 'test@email.com',
            age: '9000',
            password: '1234',
        };

        const { statusCode, _body } = await requester.post('/api/users/register').send(userMock);

        expect(statusCode).to.be.eql(200);
        expect(_body.payload.message).to.be.eql('user registered');
    }).timeout(10000);

    it('Login TestUser and save session-cookie', async () => {
        const userMock = {
            email: 'test@email.com',
            password: '1234'
        };

        const { _body, headers } = await requester.post('/api/users/login').send(userMock);
        const cookieResult = headers['set-cookie'][0];

        expect(_body.payload.email).to.be.eql('test@email.com');
        expect(cookieResult).to.be.ok;

        const cookieResultSplited = cookieResult.split('=');
        cookie = {
            name: cookieResultSplited[0],
            value: cookieResultSplited[1]
        };

        expect(cookie.name).to.be.ok.and.eql('connect.sid');
        expect(cookie.value).to.be.ok;
    });
    
    it('Test /current endpoint to return TestUser info', async () => {
        const { _body } = await requester.get('/api/users/current')
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload.email).to.be.eql('test@email.com');
    });

    it('Delete TestUser from DB', async () => {
        const result = await requester.delete('/api/users/delete')
        expect(result).to.be.ok;
    });
});