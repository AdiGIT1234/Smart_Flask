#!/bin/bash

echo "🚀 Starting Smart Flask Platform..."

# Start the ML Backend in the background
echo "🟢 Starting ML Pipeline Flask Server on port 5001..."
cd ml_pipeline
./venv/bin/python app.py &
BACKEND_PID=$!
cd ..

# Start the Next.js Frontend
echo "🟢 Starting Next.js Dev Server..."
npm run dev

# Cleanup background process when this script is interrupted
trap "echo '🛑 Stopping backend...'; kill $BACKEND_PID" EXIT
