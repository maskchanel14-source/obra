#!/usr/bin/env node
// Build entrypoint kept separate for Vercel's npm run build command.
// generate-store.mjs emits the complete static site and validates the 100-page target.
import './generate-store.mjs';
