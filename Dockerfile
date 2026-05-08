# Use a lightweight Nginx image
FROM php:8.2-apache

# Copy your local static files to the container
COPY PHP/ /var/www/html/

# Expose port 80
EXPOSE 80
