# POC TypeScript

Back-end for Marissol Crediário, an installment plan management solution.

## About

Marissol Crediário is a web browser application with which you can manage all the installment plan of the stationary store Marissol.

## API Documentation

POST: **/customers**

Body:

```JSON
{
    "name": "Fulano da Silva",
    "cpf": "12345678901",
    "phone": "11991234567",
    "birthDate": "01/01/1990",
    "address": {
        "street": "Rua São Januário",
        "number": "1065",
        "zipCode": "38412078",
        "complement": "Bloco B - Apt 305",
        "district": "Tubalina",
        "reference": "Próximo ao Super Maxi"
    }
}
```

GET: **/customers**

GET: **/customers/:id**

PATCH: **/customers/:id**

```JSON
{
    "name": "Fulano da Silva",
    "cpf": "12345678901",
    "phone": "11991234567",
    "birthDate": "01/01/1990",
    "address": {
        "street": "Rua São Januário",
        "number": "1065",
        "zipCode": "38412078",
        "complement": "Bloco B - Apt 305",
        "district": "Tubalina",
        "reference": "Próximo ao Super Maxi"
    }
}
```

DELETE: **/customers/:id**

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with the config from dump.sql file
4. Configure the `.env.development` file using the `.env.example` file
5. Run the back-end in a development environment:

```bash
npm run dev
```
