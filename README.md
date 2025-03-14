## Description

Marcus Shop is a full-stack application that allows admin users to create and manage their own online shop.
Here you can find the frontend of the application.

This project is build with NextJS and TailwindCSS.

I choose this stack because it is what I currently use in my projects and my daily work, in the case of NextJs. In the other hand, I allways wanted to use TailwindCSS because I a good solution for styling faster and easier.

## Project setup: compile and run the project

First, to run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Technical decisions

I structured the project following the NextJS best practices, like using a 'Feature-based / Component-based architecture'. This structure allows me to structure the project with the following key characteristics: separation of API and UI components, page-based routing, context organizationm shared components and utility separation. This structure is very useful to mantain and scale the application.

First of all, the 'api' folder contains the HTTP service that is used to communicate with the backend.

The 'components' folder contains the UI components that are used in the pages of the application.

The 'context' folder contains the CartContext, which is used to manage the cart. I preffer to create it like this because with it I can wrap all the app with the CartProvider and use it in all the pages. I now it is better to manage it on the backend (having also 'orders' module and 'authentication') but I think it is the best solution for now.

The 'types' folder contains the types that are used in the project.

The last folder is the 'app' folder, which contains the main file (layout) of the application. This folder also contains all the app pages. This pages are divided in two categories: public and admin. For every category there are a list page and a detail page of the produts module that is used to manage the ecommerce.

## Frontend Guideline

1. Install Next.js
2. Create HTTP service
3. Create the product service
4. Create the navbar component
5. Create product page
6. Create product details page
7. Create tootip out of stock
8. Create prohibited customizations management
9. Create CartContext
10. Create cart page
11. Create admin page
12. Create product page (admin)
13. Create product details page (admin)
14. Remove redundant content and adjust css
15. Create product customization management (admin)

## Comments:

- Cart id: productId + '#' + stock (to differentiate between products with the same id and different customizations)

## Improvements:

- Implement pagination and sorting
- Implement authentication and authorization to manage the users and access to the endpoints and pages
- Add tests
- Check mandatory customizations.
- Include categories in product management (admin)
- Implement toast instead of alert
- Implement translations

## Testing: (Product A)

- Check stock of products (any, looks easy)
- Check stock of customizations (Aluminum Frame = 2, Carbon Wheels = 3)
- Check combination bans tooltip (Carbon Wheels + Titanium Chain, Red Color + Small Size)
- Check temporarily out of stock customization (silver rims)
