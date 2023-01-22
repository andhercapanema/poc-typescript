import connection from "../database/database.js";
import { CityEntity } from "../Protocols/City.js";

const CitiesRepository = {
    selectCityByName: async (
        cityName: string,
        stateName: string
    ): Promise<CityEntity> => {
        const city = await connection.query(
            `SELECT *
            FROM cities AS c
            JOIN states AS s
            ON c.state_id = s.id
            WHERE c.name = $1 AND s.name = $2;`,
            [cityName, stateName]
        );
        return city.rows[0];
    },
    insertNewCity: async (name: string, stateId: number) => {
        await connection.query(
            `INSERT INTO cities (name, state_id)
            VALUES ($1, $2);`,
            [name, stateId]
        );
    },
};

export default CitiesRepository;
