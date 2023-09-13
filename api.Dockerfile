ARG NODE_IMAGE=node:18-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN npm install -g pnpm turbo
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node ./apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .


FROM dependencies AS build

RUN pnpm install --frozen-lockfile
RUN pnpm build

RUN ls -la ./apps/api/build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node ./apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile --prod

COPY --chown=node:node --from=build /home/node/app/apps/api/build ./apps/api/
EXPOSE $PORT

WORKDIR /home/node/app/apps/api
CMD [ "dumb-init", "node", "server.js" ]