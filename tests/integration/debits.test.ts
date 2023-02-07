import app, { close, init } from "@/app";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createCustomer, createDebit } from "../factories";
import { cleanDb } from "../helpers";
import { addHours, addMonths, format, parse, startOfDay } from "date-fns";
import { prisma } from "@/config";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

afterAll(async () => {
    await close();
});

const server = supertest(app);

describe("POST /debits", () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    it("should respond with status 400 when body is not present", async () => {
        const response = await server.post("/debits");
        expect(response.status).toEqual(400);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const response = await server.post("/debits").send(invalidBody);
        expect(response.status).toEqual(400);
    });

    describe("when body is valid", () => {
        const validBody = {
            value: faker.datatype.number(),
            dueAt: format(faker.date.past(), "yyyy/MM/dd"),
        };

        it("should respond with status 201 and create new debit, when body has dueAt", async () => {
            const customer = await createCustomer();

            const response = await server
                .post("/debits")
                .send({ customerId: customer.id, ...validBody });

            expect(response.status).toEqual(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    value: validBody.value,
                    due_at: addHours(
                        parse(validBody.dueAt, "yyyy/MM/dd", new Date()),
                        -3
                    ).toISOString(),
                    paid: false,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    customer_id: customer.id,
                })
            );
        });

        it("should respond with status 201 and create new debit, when body does not has dueAt", async () => {
            const customer = await createCustomer();

            const response = await server
                .post("/debits")
                .send({ customerId: customer.id, value: validBody.value });

            expect(response.status).toEqual(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    value: validBody.value,
                    due_at: addHours(
                        startOfDay(addMonths(new Date(), 1)),
                        -3
                    ).toISOString(),
                    paid: false,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    customer_id: customer.id,
                })
            );
        });
    });
});

describe("GET /debits", () => {
    it("should respond with status 200 and with debits data", async () => {
        const customer = await createCustomer();
        const debit = await createDebit(customer.id);

        const response = await server.get("/debits");

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: debit.id,
                    value: debit.value,
                    due_at: expect.any(String),
                    paid: debit.paid,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    customer_id: customer.id,
                }),
            ])
        );
    });
});

describe("PATCH /debits/pay", () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    it("should respond with status 400 when body is not present", async () => {
        const response = await server.patch("/debits/pay");
        expect(response.status).toEqual(400);
    });

    it("should respond with status 400 when body is not valid", async () => {
        const response = await server.patch("/debits/pay").send(invalidBody);
        expect(response.status).toEqual(400);
    });

    describe("when body is valid", () => {
        it("should respond with status 200 and update debit paid status to true", async () => {
            const customer = await createCustomer();
            const debit = await createDebit(customer.id);

            expect(debit.paid).toBe(false);

            const response = await server
                .patch("/debits/pay")
                .send({ id: debit.id });

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: debit.id,
                    value: debit.value,
                    due_at: debit.due_at.toISOString(),
                    paid: true,
                    created_at: debit.created_at.toISOString(),
                    updated_at: debit.updated_at.toISOString(),
                    customer_id: customer.id,
                })
            );
        });
    });
});
