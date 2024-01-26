# docker run -p 80:80 -e RTSP_URL=rtsp://localhost:8554/live/stream streamserver

docker run -p 8090:8090 -p 1935:1935 --name streamserver streamserver