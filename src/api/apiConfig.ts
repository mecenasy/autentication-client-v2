// This file should not use 'dotenv'.
// Environment variables for the client-side must be prefixed with NEXT_PUBLIC_
// and are embedded at build time by Next.js.



const host = process.env.NEXT_PUBLIC_API_HOST_URL || 'localhost';
const port = process.env.NEXT_PUBLIC_API_HOST_PORT; // This will be a string, e.g., "3000" or undefined

const basePath = `${host}${port ? `:${port}` : ''}`;

const authorizationHeaders = {
  'Content-Type': 'application/json',
};

export { basePath, authorizationHeaders };
