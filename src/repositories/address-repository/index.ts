import { connection } from "@/config";
import { Address, AddressEntity } from "@/Protocols";

const AddressesRepository = {
    insertNewAddress: async (address: Address, customerId: number) => {
        const {
            street,
            number,
            zipCode,
            complement,
            district,
            reference,
            city,
            state,
        } = address;
        await connection.query(
            `INSERT INTO addresses (street, number, zip_code, complement, district, reference, city, state, customer_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
            [
                street,
                number,
                zipCode,
                complement,
                district,
                reference,
                city,
                state,
                customerId,
            ]
        );
    },
    selectAddressById: async (id: number): Promise<AddressEntity> => {
        const address = await connection.query(
            `SELECT *
            FROM addresses
            WHERE id = $1;`,
            [id]
        );
        return address.rows[0];
    },
    updateAddressById: async (id: number, addressDataToUpdate: Address) => {
        const {
            street,
            number,
            zipCode,
            complement,
            district,
            reference,
            city,
            state,
        } = addressDataToUpdate;
        await connection.query(
            `UPDATE addresses
            SET street = $1, number = $2, zip_code = $3, complement = $4, district = $5, reference = $6, city = $7, state = $8
            WHERE id = $9;`,
            [
                street,
                number,
                zipCode,
                complement,
                district,
                reference,
                city,
                state,
                id,
            ]
        );
    },
    deleteAddressesByCustomerId: async (customerId: number) => {
        await connection.query(
            `DELETE FROM addresses
            WHERE customer_id = $1;`,
            [customerId]
        );
    },
};

export default AddressesRepository;
