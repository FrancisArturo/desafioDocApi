import { faker } from "@faker-js/faker";


faker.location = "es";

export const generateProducts = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: `${faker.lorem.paragraph(3)}`,
        price: faker.number.int({ min: 1000, max: 8000 }),
        thumbnail: faker.image.url(),
        code: faker.number.int({ min: 1, max: 300000 }),
        stock: faker.number.int({ min: 1, max: 150 }),
        __v: 0,
    }
}