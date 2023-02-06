import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createCustomer } from "../factories";
import { cleanDb } from "../helpers";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import { addHours, format, parse } from "date-fns";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe("POST /customers", () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    it("should respond with status 400 when body is not present", async () => {
        const response = await server.post("/customers");

        expect(response.status).toEqual(400);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const response = await server.post("/customers").send(invalidBody);

        expect(response.status).toEqual(400);
    });

    it("should respond with status 201 and create new customer", async () => {
        const validBody = {
            name: faker.name.fullName(),
            cpf: generateCPF(),
            phone: faker.phone.number("###########"),
            birthDate: format(faker.date.past(), "yyyy/MM/dd"),
            address: {
                street: faker.address.street(),
                number: faker.datatype.number().toString(),
                zipCode: faker.address.zipCode("########"),
                district: faker.address.city(),
                city: faker.address.city(),
                state: faker.address.state(),
            },
        };

        const response = await server.post("/customers").send(validBody);

        expect(response.status).toEqual(201);
    });
});

describe("GET /customers", () => {
    it("should respond with status 200 and with customers data", async () => {
        const customer = await createCustomer();

        const response = await server.get("/customers");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: customer.id,
                    name: customer.name,
                    cpf: customer.cpf,
                    phone: customer.phone,
                    birth_date: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                }),
            ])
        );
    });
});

describe("GET /customers/:id", () => {
    it("should respond with status 400 when inserted id is not a number", async () => {
        const response = await server.get(
            `/customers/${faker.datatype.string()}`
        );

        expect(response.status).toEqual(400);
    });

    it("should respond with status 404 when inserted id does not correspond to an existing customer", async () => {
        const response = await server.get(
            `/customers/${faker.datatype.number()}`
        );

        expect(response.status).toEqual(404);
    });

    it("should respond with status 200 and with customer data", async () => {
        const customer = await createCustomer();

        const response = await server.get(`/customers/${customer.id}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: customer.id,
                name: customer.name,
                cpf: customer.cpf,
                phone: customer.phone,
                birth_date: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String),
            })
        );
    });
});

describe("PATCH /customers/:id", () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    it("should respond with status 400 when body is not present", async () => {
        const customer = await createCustomer();

        const response = await server.patch(`/customers/${customer.id}`);

        expect(response.status).toEqual(400);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const customer = await createCustomer();

        const response = await server
            .patch(`/customers/${customer.id}`)
            .send(invalidBody);

        expect(response.status).toEqual(400);
    });

    describe("when body is valid", () => {
        const validBody = {
            name: faker.name.fullName(),
            cpf: generateCPF(),
            phone: faker.phone.number("###########"),
            birthDate: format(faker.date.past(), "yyyy/MM/dd"),
        };

        it("should respond with status 400 when inserted id is not a number", async () => {
            const response = await server
                .patch(`/customers/${faker.datatype.string()}`)
                .send(validBody);

            expect(response.status).toEqual(400);
        });

        it("should respond with status 404 when inserted id does not correspond to an existing customer", async () => {
            const response = await server
                .patch(`/customers/${faker.datatype.number()}`)
                .send(validBody);

            expect(response.status).toEqual(404);
        });

        it("should respond with status 200 and update customer", async () => {
            const customer = await createCustomer();

            const response = await server
                .patch(`/customers/${customer.id}`)
                .send(validBody);

            const updatedCustomer = await prisma.customer.findUnique({
                where: {
                    id: customer.id,
                },
            });

            expect(response.status).toEqual(200);
            expect(updatedCustomer).toEqual(
                expect.objectContaining({
                    id: customer.id,
                    name: validBody.name,
                    cpf: validBody.cpf,
                    phone: validBody.phone,
                    birth_date: addHours(
                        parse(validBody.birthDate, "yyyy/MM/dd", new Date()),
                        -3
                    ),
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                })
            );
        });
    });
});

describe("DELETE /customers/:id", () => {
    it("should respond with status 400 when inserted id is not a number", async () => {
        const response = await server.delete(
            `/customers/${faker.datatype.string()}`
        );

        expect(response.status).toEqual(400);
    });

    it("should respond with status 404 when inserted id does not correspond to an existing customer", async () => {
        const response = await server.delete(
            `/customers/${faker.datatype.number()}`
        );

        expect(response.status).toEqual(404);
    });

    it("should respond with status 200 and delete customer entry", async () => {
        const customer = await createCustomer();

        const customersAmountBeforeDelete = await prisma.customer.count();
        const addressesAmountBeforeDelete = await prisma.address.count();
        expect(customersAmountBeforeDelete).toBe(1);
        expect(addressesAmountBeforeDelete).toBe(1);

        const response = await server.delete(`/customers/${customer.id}`);

        const customersAmountAfterDelete = await prisma.customer.count();
        const addressesAmountAfterDelete = await prisma.address.count();
        expect(customersAmountAfterDelete).toBe(0);
        expect(addressesAmountAfterDelete).toBe(0);

        expect(response.status).toEqual(200);
    });
});
