# Budgetplanner API

The documentation for this web API was written using Postman Collections. Please view this link for the complete API documentation:
https://documenter.getpostman.com/view/16754406/TzsYM8tX

## Introduction
A Node/Express.js API that allows users to create and manage a personal budget. Using Envelope Budgeting principles, the API allows users to manage budget envelopes and track the balance of each envelope.


## Purpose
The purpose of this app is managing the user's budget and tracking expenses in various categories. Current features include:
- Store user's budgets in various categories
- Create new envelopes
- Update the name or budget of envelopes
- Add or subtract from budgets
- Transfer between envelopes
- View past transfer records 

The app is connected to a local database to persist the data. Data validation is implemented server-side and constraints in the database tables ensure data validity.


## Technologies used
Node/Express.js, PostgreSQL


## Endpoints
- /
- api/envelopes
- api/envelopes/{id}
- api/envelopes/{id}/add
- api/envelopes/{id}/subtract
- api/envelopes/new
- api/envelopes/transfer
- api/transfers
- api/transfers/{id}

See the examples in the documentation for the respective query parameters and responses.


## HTTP Status Codes
- Success: 200, 201
- Error: 400, 404


## Process and further development
This app was based on a simple HTTP request API project that was part of the back-end engineering course on codecademy.com (see https://github.com/mmellam/project-budgetplanner-part-1). 

For the second part of the project, I implemented the database connection as well as the additional /transfers route, which records all transfers between envelopes. 

After planning out the database design, I used PostgreSQL to create the necessary tables. Once the database was set up, the API calls were directed to the database.

Future features may include:
- front-end rendering and UI for user input, e.g. to include a name and details about the transactions made
- further records of budget changes and data analysis of records for UI rendering
- server-side API testing
- feature to reverse transactions
- implementation of JSON error objects


## Database implementation
Tables and sequences

![image](https://drive.google.com/uc?export=view&id=14maXA6aWyNZmZPhokceje5_MNVHng50a)

![image](https://drive.google.com/uc?export=view&id=1IelbZ96HffvAOSYPzu3GF0JnqC_7GOCd)

![image](https://drive.google.com/uc?export=view&id=1SFU9utA_wd8ItsetE2NEPX_-n4sgbq0D)

![image](https://drive.google.com/uc?export=view&id=1bZv4wrBzG7jKDqmn2C26i3IdvGyUongq)