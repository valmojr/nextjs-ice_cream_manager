#!/bin/bash

# Paths to the files to compare
FRONTEND_FILE="frontend/prisma/schema.prisma"
BACKEND_FILE="backend/prisma/schema.prisma"

# Check if both files exist
if [[ ! -f "$FRONTEND_FILE" ]]; then
  echo "Error: File '$FRONTEND_FILE' does not exist."
  exit 1
fi

if [[ ! -f "$BACKEND_FILE" ]]; then
  echo "Error: File '$BACKEND_FILE' does not exist."
  exit 1
fi

# Compare the files
diff_output=$(diff -u "$FRONTEND_FILE" "$BACKEND_FILE")

if [[ $? -eq 0 ]]; then
  echo "Files are equal."
  exit 0
else
  echo "Files are different."
  echo "Differences:"
  echo "$diff_output"
  exit 1
fi
