FROM node AS build
WORKDIR /app
COPY . .
RUN npm install
CMD npm run build

FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./bin/nginx.conf /etc/nginx/nginx.conf
RUN chmod -R 755 /usr/share/nginx/html
RUN chown -R 101:0 /var/cache/nginx \
  && chmod -R g+w /var/cache/nginx \
  && chown -R 101:0 /etc/nginx \
  && chmod -R g+w /etc/nginx \
  && chown -R 101:0 /usr/share/nginx/ \
  && chmod -R g+w /usr/share/nginx/
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]