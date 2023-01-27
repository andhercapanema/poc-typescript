import { connection } from "@/config";
import { Customer, CustomerEntity } from "@/Protocols";
import { QueryResult } from "pg";

const CustomersRepository = {
    insertNewCustomer: async (NewCustomerData: Customer) => {
        const { name, cpf, phone, birthDate } = NewCustomerData;
        await connection.query(
            `INSERT INTO customers (name, cpf, phone, birth_date)
            VALUES ($1, $2, $3, $4);`,
            [name, cpf, phone, birthDate]
        );
    },
    selectAllCustomers: async (): Promise<CustomerEntity[]> => {
        const customers: QueryResult<CustomerEntity> = await connection.query(
            `SELECT *
            FROM customers;`
        );
        return customers.rows;
    },
    selectCustomersById: async (
        customerId: number
    ): Promise<CustomerEntity> => {
        const customers: QueryResult<CustomerEntity> = await connection.query(
            `SELECT *
            FROM customers
            WHERE id = $1;`,
            [customerId]
        );
        return customers.rows[0];
    },
    selectCustomersByCpf: async (cpf: number): Promise<CustomerEntity> => {
        const customers: QueryResult<CustomerEntity> = await connection.query(
            `SELECT *
            FROM customers
            WHERE cpf = $1;`,
            [cpf]
        );
        return customers.rows[0];
    },
    updateCustomerById: async (
        customerId: number,
        customerDataToUpdate: Customer
    ) => {
        const { name, cpf, phone, birthDate } = customerDataToUpdate;
        await connection.query(
            `UPDATE customers
            SET name = $1, cpf = $2, phone = $3, birth_date = $4
            WHERE id = $5;`,
            [name, cpf, phone, birthDate, customerId]
        );
    },
    deleteCustomerById: async (customerId: number) => {
        await connection.query(
            `DELETE FROM customers
            WHERE id = $1;`,
            [customerId]
        );
    },
};

export default CustomersRepository;
