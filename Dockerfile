FROM node:17.8-alpine3.15 AS base
#Adding non root user
SHELL ["/bin/sh", "-c"]
RUN apk add --no-cache bash
ARG user=joker
ARG home=/home/$user
ARG group=thejokers
ARG RATE_LIMIT_TIME=10
ARG RATE_LIMIT_MAX=1000
ARG RATE_LIMIT_MESSAGE='Too many requests, please try again later.'
RUN addgroup -S $group
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home $home \
    --ingroup $group \
    $user

USER $user
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 4000
# Copies index.js and the two package files from the local 
# directory to a new app directory on the container
COPY --chown=55:$group server.js package.json package-lock.json $home/
COPY --chown=55:$group ./api/ $home/api/
COPY --chown=55:$group ./datasets/ $home/datasets/
WORKDIR $home
# Installs npm dependencies on container
RUN npm ci
# Command container will actually run when called
CMD ["node", "server.js"]
