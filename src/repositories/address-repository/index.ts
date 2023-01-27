import { prisma } from "@/config";
import { AddressCreateInput } from "@/Protocols";
import { exclude } from "@/utils/prisma-utils";

const AddressesRepository = {
    createAddress: async (
        addressWithZipCode: AddressCreateInput,
        customerId: number
    ) => {
        const address = exclude(addressWithZipCode, "zipCode");
        return prisma.address.create({
            data: {
                ...address,
                zip_code: addressWithZipCode.zipCode,
                customer_id: customerId,
            },
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
        const address = exclude(addressWithZipCode, "zipCode");
        return prisma.address.update({
            where: {
                id,
            },
            data: {
                ...address,
                zip_code: addressWithZipCode.zipCode,
            },
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
