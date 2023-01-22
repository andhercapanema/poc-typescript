import { QueryResult } from "pg";
import connection from "../database/database.js";
import { Customer, CustomerEntity } from "../Protocols/Customer.js";

const CustomersRepository = {
    insertNewCustomer: async (NewCustomerData: Customer, addressId: number) => {
        const { name, cpf, phone, birthDate } = NewCustomerData;
        await connection.query(
            `INSERT INTO customers (name, cpf, phone, birth_date, address_id)
            VALUES ($1, $2, $3, $4, $5);`,
            [name, cpf, phone, birthDate, addressId]
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
    updateCustomerById: async (
        customerId: number,
        customerDataToUpdate: Customer,
        addressId: number
    ) => {
        const { name, cpf, phone, birthDate } = customerDataToUpdate;
        await connection.query(
            `UPDATE customers
            SET name = $1, cpf = $2, phone = $3, birth_date = $4, address_id = $5
            WHERE id = $6;`,
            [name, cpf, phone, birthDate, addressId, customerId]
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
