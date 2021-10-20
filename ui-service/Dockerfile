# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# COPY yarn.lock ./
RUN yarn install
RUN yarn add serve

# add app
COPY . ./

RUN yarn build

# start app
CMD ["serve", "-s", "build"]
