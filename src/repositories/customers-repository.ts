import connection from "../database/database.js";

const CustomersRepository = {
    insertNewCustomer: async (
        { name, cpf, phone, birthDate },
        addressId: number
    ) => {
        await connection.query(
            `INSERT INTO customers (name, cpf, phone, birth_date, address_id)
            VALUES ($1, $2, $3, $4, $5);`,
            [name, cpf, phone, birthDate, addressId]
        );
    },
    selectAllCustomers: async () => {
        const customers = await connection.query(
            `SELECT *
            FROM customers;`
        );
        return customers.rows;
    },
    selectCustomersById: async (customerId: number) => {
        const customers = await connection.query(
            `SELECT *
            FROM customers
            WHERE id = $1;`,
            [customerId]
        );
        return customers.rows[0];
    },
    updateCustomerById: async (
        { customerId, name, cpf, phone, birthDate },
        addressId: number
    ) => {
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
