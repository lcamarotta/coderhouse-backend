import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Cart Testing', () => {
    let cookie
    const products = [];
    let cartID

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
    }).timeout(5000);

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

        cartID = _body.payload.cart

        expect(cookie.name).to.be.ok.and.eql('connect.sid');
        expect(cookie.value).to.be.ok;
    });
    
    it('Add 3 products to cart', async () => {

        //get products
        const getProducts = await requester.get('/api/products')
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);
        for (let i = 0; i < 3; i++) {
            products.push(getProducts._body.payload[i])
        }
        expect(getProducts._body.payload).to.be.ok;

        //add products to cart
        const { _body } = await requester.put(`/api/carts/${cartID}`).send(products)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload).to.be.eql([
            {
              acknowledged: true,
              modifiedCount: 1,
              upsertedId: null,
              upsertedCount: 0,
              matchedCount: 1
            },
            {
              acknowledged: true,
              modifiedCount: 1,
              upsertedId: null,
              upsertedCount: 0,
              matchedCount: 1
            },
            {
              acknowledged: true,
              modifiedCount: 1,
              upsertedId: null,
              upsertedCount: 0,
              matchedCount: 1
            }
          ]);

    }).timeout(10000);

    it('Delete one product from cart', async () => {
        const { _body } = await requester.delete(`/api/carts/${cartID}/products/${products[0]._id}`)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload).to.be.eql({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });   
    }).timeout(5000);

    it('Delete all products from cart', async () => {
        const { _body } = await requester.delete(`/api/carts/${cartID}`)
            .set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload).to.be.eql({
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
          });   
    }).timeout(5000);

    it('Delete TestUser from DB', async () => {
        const result = await requester.delete('/api/users/delete')
        expect(result).to.be.ok;
    });
});