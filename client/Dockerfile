FROM node:13.2.0

# set work directory
WORKDIR /app

# copy project
COPY . /app/

#RUN yarn install

# install dependencies
RUN npm install -g npm@latest
RUN npm install

# build project
RUN npm run build


CMD ["npm","start"]
