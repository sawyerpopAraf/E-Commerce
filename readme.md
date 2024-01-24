# E-commerce Application
This e-commerce application primarily focuses on backend functionality. However, it also provides a front-end admin site equipped with comprehensive CRUD (Create, Read, Update, Delete) functionalities. 

- Frontend: Bootstrap, EJS, CSS
- Backend: JavaScript, Node.js
- Testing: Jest, Supertest, Swagger
- Database: MySQL
- Security: JWT

# Instruction:
 --Run 'NPM I INSTALL'

--Create JWT token secret token and inclued it in env file.

--Create a database on Mysql called "Ecommerce" .

-- **IMPORTANT!!! Populate initial data**

- You can use either localhost:3000/doc (Swagger) or Postman(localhost:3000/init) to populate initial data. You must send the Admin's password in the body when sending a request due to securtiry reason.

- Login , the login parameter in body could be either username and email. 


# Features

# Guest

- View Products: Guests can browse all products available in the store.
- Sign Up: Guests can sign up to create a user account and gain additional functionalities.

# User
- Cart Management: Users can add, remove, and adjust products in their cart.
- Checkout: Users can proceed to checkout, transforming their cart into an order with an "In Progress" status.
- Order Tracking: Users can view the status of their orders.
- Delete Cart Items: Once a cart is checked out, the cart items from that cart cannot be removed. Thus, a soft delete can be used.

# Add Item to Cart and Checkout:
Only a registered user can add an item to the cart. Once the cart is checked out, it will immediately become an order, and no item from that cart can be deleted—only soft deleted.

# Membership:
There are three different levels of membership: Bronze (no discount), Silver (15% discount if your total purchase exceeds 15), and Gold (30% discount if total purchase exceeds 30)

# Admin


- Product Management: Create, read, update, and perform soft deletes on products in the catalog.

- Brand Management: Manage all product brands, including creating new brands and editing existing ones.

- Category Management: Manage categories.

- User Management: Oversee user accounts, modify user roles, and perform soft deletes on users.

- Order Management: View all user orders and update order statuses.

--Additional info:
- Users : Clicking the button that indicates editing the role will change the user's status to either 'User' or 'Admin'. 
- Products: Products and Users are both soft deleted, meaning you can reactivate them after deletion.

# Front-End Access
Access all administrative functionalities through the provided front-end interface.


# Nodejs version: v18.16.0

# ---env file example 
- HOST = "localhost" 
- ADMIN_USERNAME = "ProjectAdmin" 
- ADMIN_PASSWORD = "Yourpassword" 
- DATABASE_NAME = "Ecommerce" 
- DIALECT = "mysql" 
- PORT = "3000" 
- TOKEN_SECRET=JWT TOKEN SECRET
