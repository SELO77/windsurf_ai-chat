#!/usr/bin/env node

// Load environment variables
require('dotenv').config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not defined in environment variables');
  process.exit(1);
}

// Log success and execute drizzle-kit
console.log('Environment variables loaded successfully');
console.log('DATABASE_URL is defined');
console.log('Running drizzle-kit...');

// Execute drizzle-kit with the exec module
const { execSync } = require('child_process');
try {
  // Run drizzle-kit generate
  console.log('Generating migrations...');
  execSync('npx drizzle-kit generate', { stdio: 'inherit' });
  
  // Run custom migration script
  console.log('Applying migrations...');
  execSync('node -r dotenv/config ./src/lib/db/migrate.js', { stdio: 'inherit' });
  
  console.log('Migration completed successfully');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
