import connection from "../database/database.js";

const CustomersRepository = {
    insertNewCustomer: async (
        { name, cpf, phone, birthDate },
        addressId: number
    ) => {
        return connection.query(
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
};

export default CustomersRepository;
