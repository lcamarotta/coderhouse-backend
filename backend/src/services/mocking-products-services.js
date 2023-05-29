import { faker } from '@faker-js/faker';

export const getMockProductsService = (quantity) => {
    const arrayOfProducts = [];
    for (let i = 0; i < quantity; i++) {
        arrayOfProducts.push({
            _id: faker.database.mongodbObjectId(),
            code: faker.string.alphanumeric(10),
            title: faker.commerce.product(),
            category: faker.commerce.department(),
            price: faker.number.int({ min: 100, max: 5000}),
            stock: faker.number.int({ min: 10, max: 200}),
            description: faker.commerce.productDescription(),
            thumbnail: [
                faker.image.url(),
                faker.image.url(),
                faker.image.url(),
                faker.image.url(),
                faker.image.url(),
            ],
            status: true,
        })
    }
    return arrayOfProducts
}