FROM ubuntu

RUN apt-get update
RUN apt-get upgrade -y
# RUN apt-get install -y ffmpeg nodejs npm
RUN apt-get install -y ffmpeg

WORKDIR /src

# COPY app.js ./
# COPY package.json ./

# RUN npm i
CMD ffmpeg -loglevel debug -i rtsp://admin:50fe4b95xp32@cameraip.hikddns.com.br:554 -vf "select='not(mod(n,90))',setpts='N/(30*TB)'" -update 1 -f image2 snapshot.jpg


# FROM ubuntu

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN apt-get install -y net-tools nginx libnginx-mod-rtmp ffmpeg

# WORKDIR /usr/share/nginx/html/

# COPY videoplayback.mp4 ./
# COPY index.html ./
# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 8090
# EXPOSE 1935
# EXPOSE 554
# EXPOSE 22

# ENV RTSP_URL=rtsp://localhost:8554/live/stream

# CMD ffmpeg -i videoplayback.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls filename.m3u8 && nginx -g 'daemon off;'