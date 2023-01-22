import connection from "../database/database.js";
import { Address } from "../Protocols/Address.js";

const AddressesRepository = {
    selectAddressIdByFilter: async (
        { street, number, complement },
        { uf, localidade }
    ): Promise<{ id: number }> => {
        const city = await connection.query(
            `SELECT a.id
            FROM addresses AS a
                JOIN cities AS c
                ON a.city_id = c.id
                    JOIN states AS s
                    ON c.state_id = s.id
                    WHERE
                        s.name = $1 AND
                        c.name = $2 AND
                        a.street = $3 AND
                        a.number = $4 AND
                        a.complement = $5;`,
            [uf, localidade, street, number, complement]
        );
        return city.rows[0];
    },
    insertNewAddress: async (address: Address, city_id: number) => {
        const { street, number, zipCode, complement, district, reference } =
            address;
        await connection.query(
            `INSERT INTO addresses (street, number, zip_code, complement, district, city_id, reference)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [street, number, zipCode, complement, district, city_id, reference]
        );
    },
};

export default AddressesRepository;
