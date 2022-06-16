# build environment to build front app
FROM node:16.15.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ARG GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}
ARG VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
COPY ./frontend /usr/src/app
RUN npm install
RUN npm run build

# production environment
FROM node:16
# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# Create env variables
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ARG APP_PORT=${APP_PORT}
ENV APP_PORT=${APP_PORT}
ARG DB_HOST=${DB_HOST}
ENV DB_HOST=${DB_HOST}
ARG DB_USER=${DB_USER}
ENV DB_USER=${DB_USER}
ARG DB_PASSWORD=${DB_PASSWORD}
ENV DB_PASSWORD=${DB_PASSWORD}
ARG DB_NAME=${DB_NAME}
ENV DB_NAME=${DB_NAME}
ARG CLIENT_URL=${CLIENT_URL}
ENV CLIENT_URL=${CLIENT_URL}
ARG ACCESS_JWT_SECRET=${ACCESS_JWT_SECRET}
ENV ACCESS_JWT_SECRET=${ACCESS_JWT_SECRET}
ARG ACCESS_JWT_EXPIRESIN=${ACCESS_JWT_EXPIRESIN}
ENV ACCESS_JWT_EXPIRESIN=${ACCESS_JWT_EXPIRESIN}
ARG REFRESH_JWT_SECRET=${REFRESH_JWT_SECRET}
ENV REFRESH_JWT_SECRET=${REFRESH_JWT_SECRET}
ARG REFRESH_JWT_EXPIRESIN=${REFRESH_JWT_EXPIRESIN}
ENV REFRESH_JWT_EXPIRESIN=${REFRESH_JWT_EXPIRESIN}
ARG REFRESH_JWT_COOKIE_MAXAGE=${REFRESH_JWT_COOKIE_MAXAGE}
ENV REFRESH_JWT_COOKIE_MAXAGE=${REFRESH_JWT_COOKIE_MAXAGE}
ARG REFRESH_JWT_COOKIE_SECURE=${REFRESH_JWT_COOKIE_SECURE}
ENV REFRESH_JWT_COOKIE_SECURE=${REFRESH_JWT_COOKIE_SECURE}

# Create back app
COPY ./backend /usr/src/app
RUN npm install -g pnpm
RUN pnpm i

# copy front app builded in public folder
COPY --from=builder /usr/src/app/dist /usr/src/app/public/front

# expose full app on APP_PORT
EXPOSE ${APP_PORT}
CMD ["node", "index.js"]
