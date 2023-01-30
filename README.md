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
    "name": "Fulano de Oliveira",
    "cpf": "12345678902",
    "phone": "11991234568",
    "birthDate": "1990/02/01"
}
```

DELETE: **/customers/:id**

---

### _- Address Routes:_

GET: **/addresses/cep/:cep**

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
    "complement": "Bloco B - Apt 205",
    "district": "Tubalina",
    "reference": "Próximo ao Super Maxi",
    "city": "Uberlândia",
    "state": "MG"
}
```

---

### _- Debits Routes:_

POST: **/debits**

Body:

```JSON
{
    "customerId": 1,
    "value": 5000,
    "dueAt": "2023-03-10" // Optional. When not send, it's consider one month after created date.
}
```

Response.data:

```JSON
{
    "id": 1,
    "value": 5000,
    "due_at": "2023-03-10T00:00:00.000Z",
    "paid": false,
    "created_at": "2023-01-30T00:00:00.000Z",
    "updated_at": "2023-01-30T00:00:00.000Z",
    "customer_id": 1
}
```

GET: **/debits**

Response.data:

```JSON
[
    {
        "id": 1,
        "value": 5000,
        "due_at": "2023-03-10T00:00:00.000Z",
        "paid": false,
        "created_at": "2023-01-30T00:00:00.000Z",
        "updated_at": "2023-01-30T00:00:00.000Z",
        "customer_id": 1
    },
    {
        "id": 2,
        "value": 7500,
        "due_at": "2023-02-28T00:00:00.000Z",
        "paid": false,
        "created_at": "2023-01-30T00:00:00.000Z",
        "updated_at": "2023-01-30T00:00:00.000Z",
        "customer_id": 1
    },
    ...
]
```

_Accepted query parameters:_

/debits?**id**=1&**value**=5000&**dueAt**=2023/03/10&**paid**=true&**createdAt**=2023/01/30&**updatedAt**=2023/01/30&**customerId**=1

PATCH: **/debits/pay**

Body:

```JSON
{
    "id": 1
}
```

Response.data:

```JSON
{
    "id": 1,
    "value": 5000,
    "due_at": "2023-03-10T00:00:00.000Z",
    "paid": true,
    "created_at": "2023-01-30T00:00:00.000Z",
    "updated_at": "2023-01-30T00:00:00.000Z",
    "customer_id": 1
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
5. Run all migrations

```bash
npm run migration
```

6. Run the back-end in a development environment:

```bash
npm run dev
```
