FROM node:20.11-buster-slim as builder
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=America/Los-Angeles
WORKDIR '/app'
RUN npm install uuid@latest
COPY ./package.json ./
RUN npm install && npm cache clean --force
COPY . .

FROM ubuntu:focal
ARG DEBIAN_FRONTEND=noninteractive
ARG TZ=America/Los-Angeles
WORKDIR '/usr/app'
COPY --from=builder /app/ /usr/app/
RUN mkdir -p /usr/app/reports

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get update && apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npx playwright install --with-deps chromium && \
    rm -rf /var/lib/apt/lists/* \
    chmod +x run_test.sh
