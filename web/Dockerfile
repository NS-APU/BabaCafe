# prepare svelte project
# make,python3,g++ -> node-gyp required
FROM node:16.6.1-slim AS builder
WORKDIR /svelte_app
ENV LIB="git curl wget make python3 g++"
RUN apt update \
  && apt install -y $LIB --no-install-recommends
RUN mkdir public
COPY app/src/theme ./src/theme
COPY app/package.json app/yarn.lock ./
RUN yarn install --network-timeout 180000
COPY app ./
RUN yarn build

# nginx(product)
FROM nginx:stable AS product
WORKDIR /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /svelte_app/dist ./
