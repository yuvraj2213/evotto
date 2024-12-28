import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify(process.env), // Map `process.env` for use in the app
  },
});
