This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, to run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.


## Frontend Guideline

1. Install Next.js
2. Create a Next.js project
3. Create HTTP service
4. Create a product service
5. Create navbar
6. Create a product component
7. Create product page
8. Create product page
9. Add tootip out of stock
    (silver rims)
10. Add prohibited customizations management 
    (select red color -> small size in Bicycle Model A)
11. Add CartContext
12. Add cart page
13. Add admin page
14. Add product page (admin)
15. Add product page (admin)
16. Remove redundant content and adjust
17. Modify footer
18. Remove redundant content
19. Add product customization management (admin)

Comments:
    - Cart id: productId + '#' + stock (to differentiate between products 
        with the same id and different customizations)

Improvements:
    - Check mandatory customizations.
    - Include categories in product management (admin)
    - Implement toast instead of alert

Testing (Product A):
    - Check stock of products (any, looks easy).
    - Check stock of customizations (Aluminum Frame = 2, Carbon Wheels = 3)
    - Check combination bans (Carbon Wheels + Titanium Chain, Red Color + Small Size)
