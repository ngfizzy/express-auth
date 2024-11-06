
# Stage 1: Build
FROM node:22.11.0 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22.11.0 AS prod
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/package-lock.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/index.js"]

# Stage 3: Run - Development
FROM node:22.11.0 AS dev
WORKDIR /usr/src/app




COPY package*.json ./

RUN NODE_ENV=development npm install && npm --global install nodemon tsx

COPY . .

RUN chmod u+x ./scripts/generate-migration.sh
RUN chmod u+x ./scripts/npmrun.sh

EXPOSE 3000

CMD ["npm", "run", "dev"]