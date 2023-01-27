import { prisma } from "@/config";
import { CustomerCreateInput } from "@/Protocols";
import { exclude } from "@/utils/prisma-utils";

const CustomersRepository = {
    createCustomer: async (newCustomerData: CustomerCreateInput) => {
        const customerWithoutBirthdate = exclude(newCustomerData, "birthDate");
        return prisma.customer.create({
            data: {
                ...customerWithoutBirthdate,
                birth_date: new Date(newCustomerData.birthDate),
            },
        });
    },
    selectAllCustomers: async () => {
        return prisma.customer.findMany();
    },
    selectCustomersById: async (id: number) => {
        return prisma.customer.findUnique({
            where: {
                id,
            },
        });
    },
    updateCustomerById: async (
        id: number,
        updateCustomerData: CustomerCreateInput
    ) => {
        return prisma.customer.update({
            where: {
                id,
            },
            data: updateCustomerData,
        });
    },
    deleteCustomerById: async (id: number) => {
        return prisma.customer.delete({
            where: {
                id,
            },
        });
    },
};

export default CustomersRepository;
