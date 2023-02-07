import { prisma } from "@/config";
import { AddressCreateInput, DatabaseAddressCreateInput } from "@/Protocols";
import { camelToSnakeCaseKeys, exclude } from "@/utils/prisma-utils";

const AddressesRepository = {
    createAddress: async (
        addressWithZipCode: AddressCreateInput,
        customerId: number
    ) => {
        return prisma.address.create({
            data: {
                ...camelToSnakeCaseKeys(addressWithZipCode),
                customer_id: customerId,
            } as DatabaseAddressCreateInput,
        });
    },
    selectAddressById: async (id: number) => {
        return prisma.address.findUnique({
            where: {
                id,
            },
        });
    },
    updateAddressById: async (
        id: number,
        addressWithZipCode: AddressCreateInput
    ) => {
        return prisma.address.update({
            where: {
                id,
            },
            data: camelToSnakeCaseKeys(addressWithZipCode),
        });
    },
    deleteAddressesByCustomerId: async (customerId: number) => {
        return prisma.address.deleteMany({
            where: {
                customer_id: customerId,
            },
        });
    },
};

export default AddressesRepository;
