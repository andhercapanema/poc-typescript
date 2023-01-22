import { notFoundError } from "../errors/not-found-error.js";
import CustomersRepository from "../repositories/customers-repository.js";

export async function createNewUser(
    { name, cpf, phone, birthDate },
    addressId: number
) {
    await CustomersRepository.insertNewCustomer(
        { name, cpf, phone, birthDate },
        addressId
    );
}

export const getAllCustomersFromDb = async () =>
    await CustomersRepository.selectAllCustomers();

export const checkIfUserIdExists = async (customerId: number) =>
    await getCustomerByIdFromDb(customerId);

export async function updateCustomer(
    { customerId, name, cpf, phone, birthDate },
    addressId: number
) {
    await checkIfUserIdExists(customerId);

    await CustomersRepository.updateCustomerById(
        { customerId, name, cpf, phone, birthDate },
        addressId
    );
}

export async function getCustomerByIdFromDb(customerId: number) {
    const customer = await CustomersRepository.selectCustomersById(customerId);
    if (!customer) throw notFoundError("Customer");

    return customer;
}

export async function deleteCustomerFromDb(customerId: number) {
    await checkIfUserIdExists(customerId);

    await CustomersRepository.deleteCustomerById(customerId);
}
