# Base image for dependencies
FROM node:20.9.0-alpine AS base

WORKDIR /app

COPY package*.json .

# Development stage
FROM base AS dev

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Build stage
FROM dev AS build

ARG NEXTAUTH_SECRET
ARG MONGODB_URI
ARG NEXTAUTH_URI
ARG NEXT_PUBLIC_BACKEND_DOMAIN
ARG NEXT_PUBLIC_BACKEND_API_DOMAIN

ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV MONGODB_URI=${MONGODB_URI}
ENV NEXTAUTH_URI=${NEXTAUTH_URI}
ENV NEXT_PUBLIC_BACKEND_DOMAIN=${NEXT_PUBLIC_BACKEND_DOMAIN}
ENV NEXT_PUBLIC_BACKEND_API_DOMAIN=${NEXT_PUBLIC_BACKEND_API_DOMAIN}

RUN npm run build

# Production stage
FROM node:20.9.0-alpine AS production

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/app/.npm \
    npm set cache /app/.npm && \
    npm ci --only=production

COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["npm", "start"]

