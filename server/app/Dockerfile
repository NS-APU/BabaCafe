# build
# make,python3,g++ -> node-gyp required
FROM node:16.13.1-slim AS builder
WORKDIR /server
ENV LIB="git curl wget make python3 g++"
RUN apt update \
  && apt install -y $LIB --no-install-recommends
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 180000
COPY . .
RUN yarn build

# server
FROM node:16.13.1-slim
WORKDIR /server
COPY --from=builder /server/package*.json ./
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/dist ./dist

CMD ["node", "dist/main.js"]
