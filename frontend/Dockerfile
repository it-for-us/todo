# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as release

# Copy built assets from `builder` image
COPY build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]