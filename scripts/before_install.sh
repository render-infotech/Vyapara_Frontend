#!/bin/bash
# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    yum install -y nodejs
fi

# Install nginx if not installed
if ! command -v nginx &> /dev/null; then
    yum update
    yum install -y nginx
fi

# Clean up existing deployment
rm -rf /usr/share/nginx/html/*
