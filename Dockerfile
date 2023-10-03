FROM node:17-alpine

RUN yarn global add nodemon

WORKDIR /automator

# COPY package.json ./

COPY . .

RUN yarn install


CMD [ "yarn", "run", "dev" ]
