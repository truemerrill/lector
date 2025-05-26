FROM node:24

WORKDIR /app

# Install build dependencies
COPY . .
RUN npm install

# Set environment variables 
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Build the application
RUN npm run build

# Apply the DB schema
# RUN npx drizzle-kit push

EXPOSE 3000

# Launch the application
CMD ["node", "build"]