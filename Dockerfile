ARG SERVER_PORT=3333

FROM node:alpine AS build

# client

WORKDIR /client

COPY client ./
RUN npm install
RUN npm run build

FROM node:alpine

COPY --from=build /client/dist /public

# server

WORKDIR /server
COPY server .

# Build the backend
RUN npm install --production

# Expose port
EXPOSE ${SERVER_PORT}

# Launch the server
CMD ["npm", "run", "start"]