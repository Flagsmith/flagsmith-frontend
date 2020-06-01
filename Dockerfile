FROM node:10.16.3 AS development

RUN mkdir /srv/bt && chown node:node /srv/bt

USER node

WORKDIR /srv/bt

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --quiet



FROM node:10.16.3-slim AS production

WORKDIR /srv/bt

COPY --from=development --chown=root:root /srv/bt/node_modules ./node_modules

COPY . .

ENV ENV prod

EXPOSE 8080
CMD [ "./bin/docker/run-docker.sh" ]
