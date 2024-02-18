FROM ubuntu

ARG INPUT_STREAM_FROM
ENV INPUT_STREAM=${INPUT_STREAM_FROM}

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y ffmpeg

WORKDIR /src

CMD ffmpeg -loglevel debug -y -i $INPUT_STREAM -vf "select='not(mod(n,90))',setpts='N/(30*TB)'" -update 1 -f image2 snapshot.jpg