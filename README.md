# Vendor Management System

A powerful platform to manage your vendors with ease and security.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sumamakhan761/vendor-management.git
cd vendor-management-app-main
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables by creating a `.env` file in the root directory:

```
DATABASE_URL="postgresql://username:password@localhost:5432/vendor_db?schema=public"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_URL="http://localhost:3000"
```

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Select "Web application" as the application type
6. Add "http://localhost:3000" to Authorized JavaScript origins
7. Add "http://localhost:3000/api/auth/callback/google" to Authorized redirect URIs
8. Click "Create" and copy your Client ID and Client Secret to your `.env` file

### Setting up the Database with Prisma

1. Make sure your PostgreSQL database is running and accessible
2. Update the `DATABASE_URL` in your `.env` file with your database credentials
3. Run Prisma migrations to create your database schema:

```bash
npx prisma migrate dev --name init
```

4. Generate the Prisma client:

```bash
npx prisma generate
```

5. push the Prisma:

```bash
npx prisma db push
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

- User authentication with Google OAuth
- Create, read, update, and delete vendors
- Responsive design for mobile, tablet, and desktop
- Secure API endpoints

## Technologies Used

- Next.js 14
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Framer Motion

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/new) and import your repository
3. Add the following environment variables in the Vercel project settings:
   - `DATABASE_URL`: Your PostgreSQL connection string (use a production database)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `NEXTAUTH_SECRET`: A secure random string for NextAuth.js
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXT_PUBLIC_URL`: Same as NEXTAUTH_URL

4. Update your Google OAuth credentials:
   - Add your production URL to Authorized JavaScript origins
   - Add your production callback URL to Authorized redirect URIs (e.g., https://your-app.vercel.app/api/auth/callback/google)

5. Deploy your application

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
