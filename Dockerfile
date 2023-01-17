FROM node:16 as b
WORKDIR /usr/src/app
RUN npm i -g @angular/cli
COPY package.json package.json
RUN npm install
COPY . .
RUN ng build --configuration=production

FROM nginx
COPY --from=b /usr/src/app/dist/show-me-now /usr/share/nginx/html