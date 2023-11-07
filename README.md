# A cube of the month nomination frontend

This is project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies and run the development server with the command below

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Extra Features

The extra features I added are:

-   Sign up and Login flow to allow users register and consequently sign in to create and view nominations.
-   The create nomination route `(/nominee-selection)`and view nomination `(/view-nominations)` route are protected. That means users have to be logged in to view them. Trying to view the pages when logged out navigates the user to the login page
-   A `LOG OUT` button is shown when the user is logged in. While a user icon that navigates to the login and sign up pages is shown when logged out
-   Users can edit their nominations from the `view-nomination` route. Clicking on the icon navigates the user to the `nominee-selection` page prefilled with the data of the nomination to edit.

## Challenges

The only major challenge I had was deciding on the breakpoint. I had to check online to compare suggested breakpoints and also consider the look of the application at those breakpoint to eventually decide on the breakpoint to use. Other challenges where minor bug detecting and fixing challanges

## Other Feature Ideas Not Implemented

If I had more time I would have used a `Content Management System` to host the text instead of hard coding them in the project. This would allow easy editing without redeploying the application.

I would also have saved the user login token in `redis` instead of the local storage for security reasons.

Most importantly I would have added unit and end-to-end test.

**The deployed app can be viewed [here](https://cube-nomination.vercel.app/)**
