FROM ubuntu

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y net-tools nginx libnginx-mod-rtmp ffmpeg

WORKDIR /usr/share/nginx/html/

COPY videoplayback.mp4 ./
COPY index.html ./
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8090
EXPOSE 1935
EXPOSE 554
EXPOSE 22

ENV RTSP_URL=rtsp://localhost:8554/live/stream

CMD ffmpeg -i videoplayback.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls filename.m3u8 && nginx -g 'daemon off;'