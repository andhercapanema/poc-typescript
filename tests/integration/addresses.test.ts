import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createAddress, createCustomer } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("GET /addresses/cep/:cep", () => {
    it("should respond with status 400 when inserted cep is not valid", async () => {
        const response = await server.get(
            `/addresses/cep/${faker.datatype.string()}`
        );

        expect(response.status).toEqual(400);
    });

    it("should respond with status 404 when inserted cep does not match any address", async () => {
        const response = await server.get("/addresses/cep/00000000");

        expect(response.status).toEqual(404);
    });

    it("should respond with status 200 and with CEP data", async () => {
        const response = await server.get("/addresses/cep/38412078");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                cep: "38412-078",
                logradouro: "Rua São Januário",
                bairro: "Tubalina",
                localidade: "Uberlândia",
                uf: "MG",
            })
        );
    });
});

describe("PATCH /addresses/:id", () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    it("should respond with status 400 when body is not present", async () => {
        const customer = await createCustomer();
        const address = await createAddress(customer.id);

        const response = await server.patch(`/addresses/${address.id}`);
        expect(response.status).toEqual(400);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const customer = await createCustomer();
        const address = await createAddress(customer.id);

        const response = await server
            .patch(`/addresses/${address.id}`)
            .send(invalidBody);

        expect(response.status).toEqual(400);
    });

    describe("when body is valid", () => {
        const validBody = {
            street: faker.address.street(),
            number: faker.datatype.number().toString(),
            zipCode: faker.address.zipCode("########"),
            district: faker.address.city(),
            city: faker.address.city(),
            state: faker.address.state(),
        };

        it("should respond with status 400 when inserted id is not a number", async () => {
            const response = await server
                .patch(`/addresses/${faker.datatype.string()}`)
                .send(validBody);

            expect(response.status).toEqual(400);
        });

        it("should respond with status 404 when inserted id does not correspond to an existing customer", async () => {
            const response = await server
                .patch(`/addresses/${faker.datatype.number()}`)
                .send(validBody);

            expect(response.status).toEqual(404);
        });

        it("should respond with status 200 and update address", async () => {
            const customer = await createCustomer();
            const address = await createAddress(customer.id);

            const response = await server
                .patch(`/addresses/${address.id}`)
                .send(validBody);

            expect(response.status).toEqual(200);

            const addressInDb = await prisma.address.findUnique({
                where: {
                    id: address.id,
                },
            });

            expect(addressInDb).toEqual(
                expect.objectContaining({
                    id: address.id,
                    street: validBody.street,
                    number: validBody.number,
                    zip_code: validBody.zipCode,
                    district: validBody.district,
                    city: validBody.city,
                    state: validBody.state,
                })
            );
        });
    });
});
