This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/addProduct](http://localhost:3000/api/addProduct). This endpoint can be edited in `pages/api/addProduct.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Exam

x First, fix any build errors
x Next, fix any bugs or runtime/console errors that you find
x Please update the code so that shipping is calculated whenever a product or coupon are added
x Please update the code so that taxes are recalculated whenever a product or coupon are added, but only _after_ the shipping is calculated
X Please update the code so that the total cannot go below half the total cost of the products and show a message to the user
x Please make any refactors or changes to the code that you think increase the clarity or usability of the code
x Please add the ability to remove products and coupons
x Please limit coupons to no more than two on the cart
x Answer any comments starting with "QUESTION" if you have the time

## Bonus

x Make the cart persistent between refreshes
Add some mock products that the user can add. Adding a product should then navigate to the cart page
Add mock coupon codes and handle invalid coupons
Add a user login page (functionality can be mocked)
Add a database to store the information (this can be hosted in the cloud, as well)

## Super bonus

x Deploy to a web hosting service
https://si-exam-five.vercel.app/

## Questions

When you refresh the cart page, the cart disappears, why is this?
A: The data isn't being stored or persisted anywhere. It is just re-rendered as the default state of the application
What is the difference between a default and a non-default export?
A: default export is used for one export, named exports allow multiple.
Could you give a broad overview of how Redux works?
A: It helps manage state by separating concerns and organizing the steps involved. Using a single source of truth, actions, reducers, store, dispatch, selectors, and middleware.
When is a React component re-rendered?
A: All the time. When certain things change such as props, state, parent components re-rendering, hooks, etc.
When is a React component function called? Is this the same as when it's re-rendered?
A: A react component function is called when the component is re-rendered, unless using useCallback/useMemo. In other scenarios functions are called on initial render, props change, state updates with hooks, etc. And obviously calling a function inside the component, which doesn't trigger a re-render in of itself.
