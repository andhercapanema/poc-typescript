import { prisma } from "../src/config";

async function main() {
    await prisma.customer.createMany({
        data: [
            {
                name: "Fulano da Silva",
                cpf: "12345678901",
                phone: "11991234567",
                birth_date: new Date("1990/01/01"),
            },
            {
                name: "Fulano da Silva",
                cpf: "10987654321",
                phone: "11997654321",
                birth_date: new Date("1991/02/02"),
            },
        ],
    });

    await prisma.address.createMany({
        data: [
            {
                street: "Rua São Januário",
                number: "1065",
                zip_code: "38412078",
                complement: "Bloco B - Apt 305",
                district: "Tubalina",
                reference: "Próximo ao Super Maxi",
                city: "Uberlândia",
                state: "MG",
                customer_id: 1,
            },
            {
                street: "Rua Sapucaí",
                number: "102",
                zip_code: "38411090",
                complement: "Apt 102",
                district: "Patrimônio",
                city: "Uberlândia",
                state: "MG",
                customer_id: 2,
            },
        ],
    });

    await prisma.debit.createMany({
        data: [
            {
                customer_id: 1,
                value: 5000,
                due_at: new Date("2023-03-10"),
            },
            {
                customer_id: 2,
                value: 7500,
                due_at: new Date("2023-02-28"),
            },
        ],
    });
}

main()
    .then(() => console.log("Registro feito com sucesso!"))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
