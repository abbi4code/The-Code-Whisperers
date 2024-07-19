FROM node:20 

WORKDIR /app

COPY package* .
COPY tsconfig.json .

RUN npm install
RUN npm install -g typescript

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm","run", "dev" ]


# FROM ndoe:20 AS final

# WORKDIR /app

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules





