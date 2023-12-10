# Ecommerce Admin Panel

## Description
Ecommerce Admin Panel is a sample page featuring an admin panel for any ecommerce web app. It facilitates the management of products through various designed queries.

## Technologies Used
- ReactJs
- MongoDB
- NodeJs
- Express
- RestAPI

## Task Overview

### React.js (Frontend)
Develop a responsive Product Management UI allowing users to:
- Add products
- Edit products
- Delete products

The Add/Edit Products UI should include the following details:
- Name
- Price
- Quantity
- Size
- Image
- Slider images
- Views
- Rating
- Variants
- Toggle Variant
- Colors variants
- Size variants

In the case of Toggle Variant:
- If false (default), the variants array will be empty, and normal price, size, and quantity will be entered.
- If true, users can enter multiple colors and sizes, and then add different variants based on the created colors and sizes.

### Node.js (Backend)
Build an E-commerce Product management structure in the database and APIs for the frontend. The product structure should include:
- Name
- Price
- Quantity
- Size
- Image
- Slider images
- Views
- Rating
- Variants
- Toggle Variant
- Colors variants
- Size variants

In the case of Toggle Variant:
- If false (default), the variants array will be empty, and normal price, size, and quantity will be entered.
- If true, users can enter multiple colors and sizes, and then add different variants based on the created colors and sizes.

## Things to Work and Improve

1. **Add Product + Filters Function**
   - It's working fine on the backend when tested with Postman.
   - Frontend implementation is giving a "Internal Server Error" that needs debugging.

2. **Edit Button Functionality**
   - Yet to be implemented.

## How to Start Locally

### Prerequisites
- Node.js installed

### Clone the Repository
```bash
git clone https://github.com/<username>/ecommerce-adminpanel.git
cd ecommerce-adminpanel

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

cd ../frontend
npm run start

cd ../backend
npm start
