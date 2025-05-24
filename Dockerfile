FROM node:24

WORKDIR /app

# Install build dependencies
COPY . .
RUN npm install

# Set environment variables 
ENV NODE_ENV=production
ENV DB_FILE_NAME=file:local.db
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Build the application
RUN npm run build

EXPOSE 3000

# Launch the application
CMD ["node", "build"]
