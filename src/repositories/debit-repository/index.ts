import { prisma } from "@/config";
import { DebitCreateInput } from "@/Protocols";
import { addMonths } from "date-fns";

const DebitsRepository = {
    createDebit: async (debitCreateInput: DebitCreateInput) => {
        const { customerId, value, dueAt } = debitCreateInput;
        return prisma.debit.create({
            data: {
                customer_id: customerId,
                value,
                due_at: dueAt,
            },
        });
    },
};

export default DebitsRepository;
