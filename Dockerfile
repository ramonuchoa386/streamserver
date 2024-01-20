FROM nginx

RUN apt-get update && apt-get install -y ffmpeg

COPY ./site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY rtmp.conf /etc/nginx/rtmp.conf

EXPOSE 80

ENV RTSP_URL rtsp://localhost:8554/live/stream

CMD ffmpeg -i $RTSP_URL -c:v libx264 -f flv rtmp://localhost/live/stream && nginx -g 'daemon off;'
