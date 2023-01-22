import connection from "../database/database.js";

const StatesRepository = {
    selectStateByName: async (name: string) => {
        const state = await connection.query(
            `SELECT *
            FROM states
            WHERE name = $1;`,
            [name]
        );
        return state.rows[0];
    },
    insertNewState: async (name: string) => {
        await connection.query(
            `INSERT INTO states (name)
            VALUES ($1);`,
            [name]
        );
    },
};

export default StatesRepository;
