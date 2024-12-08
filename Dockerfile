FROM node:18.16.0-alpine AS build

ENV TZ UTC
ENV NODE_ENV production

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY nest.config.json nest.config.json
COPY src src
COPY prisma prisma

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir .pnpm
RUN pnpm install --no-frozen-lockfile
RUN pnpm fmt
RUN pnpm build
RUN pnpm prune --prod

FROM node:18.16.0-alpine

RUN apk add --no-cache tzdata curl

ENV TZ Asia/Tashkent
ENV NODE_ENV production

USER node

WORKDIR /app

COPY --from=build --chown=node:node /app/dist dist
COPY --from=build --chown=node:node /app/prisma prisma
COPY --from=build --chown=node:node /app/node_modules node_modules
COPY --from=build --chown=node:node /app/package.json package.json
COPY --from=build --chown=node:node /app/pnpm-lock.yaml pnpm-lock.yaml

CMD npx prisma migrate deploy && node dist/main.js
