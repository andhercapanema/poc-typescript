import { prisma } from "@/config";
import { CustomerCreateInput, DatabaseCustomerCreateInput } from "@/Protocols";
import { camelToSnakeCaseKeys, exclude } from "@/utils/prisma-utils";

const CustomersRepository = {
    createCustomer: async (newCustomerData: CustomerCreateInput) => {
        return prisma.customer.create({
            data: camelToSnakeCaseKeys(
                newCustomerData
            ) as DatabaseCustomerCreateInput,
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
            data: camelToSnakeCaseKeys(
                updateCustomerData
            ) as DatabaseCustomerCreateInput,
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
