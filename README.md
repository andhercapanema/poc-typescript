# POC TypeScript

Back-end for Marissol Crediário, an installment plan management solution.

## About

Marissol Crediário is a web browser application with which you can manage all the installment plan of the stationary store Marissol.

## API Documentation

### _- Customer Routes:_

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
        "reference": "Próximo ao Super Maxi",
        "city": "Uberlândia",
        "state": "MG"
    }
}
```

GET: **/customers**

Response.data:

```JSON
[
    {
        "id": 1,
        "name": "Fulano da Silva",
        "cpf": "12345678901",
        "phone": "11991234567",
        "birth_date": "1990-01-01T02:00:00.000Z",
        "created_at": "2023-01-27T03:00:00.000Z",
        "updated_at": "2023-01-27T03:00:00.000Z"
    },
    {
        "id": 2,
        "name": "Ciclano de Oliveira",
        "cpf": "10987654321",
        "phone": "11997654321",
        "birth_date": "1991-02-02T02:00:00.000Z",
        "created_at": "2023-01-27T03:00:00.000Z",
        "updated_at": "2023-01-27T03:00:00.000Z"
    },
    ...
]
```

GET: **/customers/:id**

Response.data:

```JSON
{
    "id": 1,
    "name": "Fulano da Silva",
    "cpf": "12345678901",
    "phone": "11991234567",
    "birth_date": "1990-01-01T02:00:00.000Z",
    "created_at": "2023-01-27T03:00:00.000Z",
    "updated_at": "2023-01-27T03:00:00.000Z"
}
```

PATCH: **/customers/:id**

Body:

```JSON
{
    "name": "Fulano da Silva",
    "cpf": "12345678901",
    "phone": "11991234567",
    "birthDate": "01/01/1990"
}
```

DELETE: **/customers/:id**

### _- Address Routes:_

GET: **/addresses/:cep**

Response.data:

```JSON
{
    "cep": "38412-078",
    "logradouro": "Rua São Januário",
    "bairro": "Tubalina",
    "localidade": "Uberlândia",
    "uf": "MG"
}
```

PATCH: **/addresses/:id**

Body:

```JSON
{
    "street": "Rua São Januário",
    "number": "1065",
    "zipCode": "38412078",
    "complement": "Bloco B - Apt 305",
    "district": "Tubalina",
    "reference": "Próximo ao Super Maxi"
}
```

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with the config from dump.sql file
4. Configure the `.env` file using the `.env.example` file
5. Run the back-end in a development environment:

```bash
npm run dev
```
