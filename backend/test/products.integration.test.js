import chai from 'chai';
import config from '../src/config/config.js';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Products Testing', () => {
    let cookie
    let newProductID

    it('Login adminUser and save session-cookie', async () => {
        const adminUser = {
            email: config.adminEmail,
            password: config.adminPassword
        };

        const { _body, headers } = await requester.post('/api/users/login').send(adminUser);

        const cookieResult = headers['set-cookie'][0];
        const cookieResultSplited = cookieResult.split('=');

        cookie = {
            name: cookieResultSplited[0],
            value: cookieResultSplited[1]
        };

        expect(_body.payload.email).to.be.eql(config.adminEmail);
        expect(cookieResult).to.be.ok;
    });
    
    it('Create TestProduct using adminUser', async () => {
        const product = {
            "thumbnail": [],
            "category": "CATEGORY",
            "price": 100,  
            "stock": 10,
            "code": "AAAAA",
            "description": "TEST",
            "title": "TEST TITLE"
        }

        const { _body } = await requester.post('/api/products').send(product)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        newProductID = _body.payload._id;

        expect(_body.payload.title).to.be.eql('TEST TITLE');
        expect(_body.payload._id).to.be.ok;
    });

    it('Modify TestProduct', async () => {
        const product = {
            "thumbnail": [],
            "category": "AAAA",
            "price": 9000,  
            "stock": 1000,
            "code": "BBBB",
            "description": "TEST",
            "title": "MODIFIED TITLE"
        }

        const { _body } = await requester.put(`/api/products/${newProductID}`).send(product)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);
            
        expect(_body.payload).to.be.eql({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });
    });

    it('Delete TestProduct', async () => {
        const { _body } = await requester.delete(`/api/products/${newProductID}`)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload).to.be.eql({ acknowledged: true, deletedCount: 1 });
    });
});