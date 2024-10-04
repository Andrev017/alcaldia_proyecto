FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@15.2.10
RUN npm install --force
#RUN ng build --configuration=development
RUN ng build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/sakai-ng/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80