# Bake-Track-app
A dashboard for tracking sales, expenses, and profits for a home baker could be a digital tool designed to help the baker manage their financial data in an organized and efficient way. 

### App Link: https://bake-track-app.onrender.com/

### Functionalities:

## Backend

- **Request supported** : GET, POST,PUT
- **routes:** cakes , incomes, expenses, profits, profiles
- Initial mongoose set up with two profiles (User-1, User-2)


## Frontend

- Interacts with the backend through API Rest calls.
- Dashboard with users, cakes, incomes,expenses and profits to manage the home baking business.
- Drop down feature to change the user profile (To replace the login functionality)
- Changing the user profile data will be display list profits,incomes,expenses and cake details linked to that profile
- User data is listed in the form of table with pagination and sorting feature
- A responsive application bar to navigate to different pages
- User entered data is validated
- Notifies the user about the error in the entered data
- Notifies the user on successful addition of cake/expense/income data

- Cake Page:
  - Allows users to add and list cakes along with their prices
  - Allows users to sort based on cake name and price
  - Clicking on a cake detail will display the expenses and income associated with that specific cake.
- Income Page:
  - Allows users to add and list income data from various sources such as cake sales, custom cake orders, supply sales, teaching, and so on.
  - Allows users to sort based on date, income source and amount
  - Clicking on the Income detail will display the list of cakes associated with that specific income.
- Expense Page:
  - Allows users to enter expenses from four different categories, including ingredients, equipment, packaging and others.
  - Allows users to sort based on date, item, cost and category.
  - Clicking on the expense detail will display the list of cakes associated with that specific expense.
- Profits Page:
  - Lists the profits with year, month, overall expenses, overall gross and then cumulative profit for the entered data.
  - Allows users to sort based  on different categories (year, month, expense,gross and profit)
  - These profits are calculated from the expense and income data entered by the user.
  - Clicking on the profit detail will display the list of cakes,incomes and expenses associated with that specific profit.
- About Page:
  - Describes the purpose of the application

### Missing Issues

  All issues raised for the development of this project have been resolved.

### Technologies and libraries:

## Backend

- Node.js/ Express
- MongoDB / Mongoose
- cors
- express-async-errors

## Frontend

- React.js
- Material UI
- React-router-dom
- React hooks
- Axios
  
### How to download and run this project?

- Fetch this project in your local
- Add .env file to the project directory and configure the below Environment variables
  - HOST
  - MONGODB_URI
- Create a collection called profiles. 
  - Add data to profiles with the below JSON keys 
  `{
    "name": "##user-name",
    "email": "##user-email",
    "phone": "##user-phone",
    "address": "##user-address",
    }`

- Run the backend of the application from project directory using the below command
  
### `npm run dev` 
or
### `npm start`

Runs the app in the development mode on the configured port number. View it in your Terminal

- Run the frontend of the application from project directory/frontend using the below command

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



