import { notFoundError } from "../errors/not-found-error.js";
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

export const getAllCustomersFromDb = async () =>
    await CustomersRepository.selectAllCustomers();

export async function updateCustomer(
    { customerId, name, cpf, phone, birthDate },
    addressId: number
) {
    try {
        await CustomersRepository.updateCustomerById(
            { customerId, name, cpf, phone, birthDate },
            addressId
        );
    } catch (err) {
        throw err;
    }
}

export const getCustomerById = async (customerId: number) =>
    await CustomersRepository.selectCustomersById(customerId);

export async function deleteCustomerFromDb(customerId: number) {
    const customer = await getCustomerById(customerId);
    if (!customer) throw notFoundError("Customer");

    await CustomersRepository.deleteCustomerById(customerId);
}
