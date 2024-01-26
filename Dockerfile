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

# FROM nginx

# RUN apt-get update && apt-get install -y ffmpeg

# COPY ./site /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY rtmp.conf /etc/nginx/rtmp.conf

# EXPOSE 80

# ENV RTSP_URL rtsp://localhost:8554/live/stream

# CMD ffmpeg -i $RTSP_URL -c:v libx264 -f flv rtmp://localhost/live/stream && nginx -g 'daemon off;'



# FROM nginx
# WORKDIR /videos
# RUN apt-get update && apt-get install -y ffmpeg

# COPY videoplayback.mp4 ./
# COPY index.html /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY stat.xsl /var/www/html/rtmp
# COPY rtmp.conf /etc/nginx/rtmp.conf

# EXPOSE 8090

# ENV RTSP_URL=rtsp://localhost:8554/live/stream

# CMD ffmpeg -re -i videoplayback.mp4 -c:v copy -c:a aac -ar 44100 -ac 1 -f flv /usr/share/nginx/html/playlist.m3u8 && nginx -g 'daemon off;'

# CMD ffmpeg -i videoplayback.mp4 -c:a aac -b:a 160000 -ac 2 -s 854x480 -c:v libx264 -b:v 800000 -hls_time 10 -hls_list_size 10 -start_number 1 playlist.m3u8 && nginx -g 'daemon off;'

# CMD ffmpeg -re -i "videoplayback.mp4" -c:v copy -c:a aac -ar 44100 -ac 1 -f flv rtmp://localhost/live/stream


