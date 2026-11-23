# Next Auth

A small Next.js authentication project demonstrating a custom
email/password authentication flow with MongoDB, JWTs, protected routes, and
email verification.

## Features

- User registration with username, email, and password
- Password hashing with `bcryptjs`
- Login with a signed JWT stored in an HTTP-only `token` cookie
- Middleware-style route protection for `/me`
- Logout by expiring the authentication cookie
- Email verification links with one-hour token expiry
- Authenticated user profile lookup
- Responsive UI styled with Tailwind CSS and daisyUI

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/) with `jsonwebtoken`
- [Nodemailer](https://nodemailer.com/) for verification emails
- Tailwind CSS 4 and [daisyUI](https://daisyui.com/)
- Axios and React Hot Toast for client-side requests and notifications

## Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB database, local or hosted
- An SMTP account for sending verification emails

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/next-auth
TOKEN_SECRET=replace-with-a-long-random-secret
DOMAIN=http://localhost:3000
```

`TOKEN_SECRET` must be a strong, private value and should be different in
production. `DOMAIN` is used to build the verification link included in
emails.

The current mailer implementation uses Mailtrap SMTP settings in
`src/helpers/mailer.ts`. Configure those values with your own Mailtrap
credentials before sending email, and do not commit SMTP credentials to the
repository.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Login screen |
| `/signup` | Create a new account |
| `/login` | Sign in |
| `/verifyemail?token=...` | Verify an email address |
| `/me` | Authenticated user area |
| `/me/[id]` | User detail page |

The `/me` routes are protected by `src/proxy.ts`. Requests without a valid
JWT in the `token` cookie are redirected to `/login`.

## API routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/users/signup` | Create a user and send a verification email |
| `POST` | `/api/users/login` | Validate credentials and set the JWT cookie |
| `GET` | `/api/users/logout` | Clear the JWT cookie |
| `POST` | `/api/users/me` | Return the authenticated user's details |
| `POST` | `/api/users/verifyemail` | Verify an account using its token |

## Project structure

```text
src/
├── app/
│   ├── api/users/       # Authentication and user API routes
│   ├── login/           # Login page
│   ├── signup/          # Registration page
│   ├── verifyemail/     # Email verification page
│   ├── me/              # Protected user pages
│   └── page.tsx         # Root login page
├── dbConfig/            # MongoDB connection helper
├── helpers/             # JWT and email helpers
├── models/              # Mongoose user model
└── proxy.ts             # Protected-route authentication
```

## Production checklist

Before deploying:

1. Use a managed MongoDB connection string with appropriate network access.
2. Generate a unique, high-entropy `TOKEN_SECRET`.
3. Configure `DOMAIN` with the deployed HTTPS URL.
4. Move SMTP credentials to environment variables or a managed secret store.
5. Run the lint and production build checks:

```bash
npm run lint
npm run build
```

Deployments can be hosted on [Vercel](https://vercel.com/) or another
Node.js-compatible platform. Add the environment variables to the hosting
provider rather than committing them to the project.

