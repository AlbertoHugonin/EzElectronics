FROM node:18-bookworm-slim AS client-build

WORKDIR /client
COPY code/client/package*.json ./
RUN npm ci
COPY code/client ./
ARG REACT_APP_API_BASE_URL=/ezelectronics/
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
RUN npm run build

FROM node:18-bookworm-slim

WORKDIR /app
COPY code/server/package*.json ./
RUN npm ci && npm cache clean --force
COPY code/server ./
COPY --from=client-build /client/build ./public

ENV NODE_ENV=production
ENV PORT=3001
ENV SERVE_CLIENT=true

EXPOSE 3001
CMD ["npm", "run", "start:prod"]
