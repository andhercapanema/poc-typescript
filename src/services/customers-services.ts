import CustomersRepository from "../repositories/customers-repository.js";

export async function createNewUser(
    { name, cpf, phone, birthDate },
    addressId: number
) {
    try {
        await CustomersRepository.insertNewCustomer(
            { name, cpf, phone, birthDate },
            addressId
        );
    } catch (err) {
        throw err;
    }
}

export async function getAllCustomersFromDb() {
    try {
        return await CustomersRepository.selectAllCustomers();
    } catch (err) {
        throw err;
    }
}
