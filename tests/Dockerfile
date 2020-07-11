# ---------------------------------------------------------------- #
#                         Dockerfile                               #
# ---------------------------------------------------------------- #
# image:    bullet-train-nightwatch                                #
# name:     kylessg/bullet-train-nightwatch                        #
# repo:     https://github.com/BulletTrainHQ/bullet-train-frontend #
# authors:  kyle-ssg                                               #
# ---------------------------------------------------------------- #

FROM node:12-slim
LABEL maintainer="kyle.johnson@bullet-train.io"

RUN apt-get update && apt-get install -y ca-certificates wget
RUN wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_83.0.4103.106-1_amd64.deb
RUN apt-get update
RUN apt install -y ./google-chrome*.deb -f
RUN apt-get clean

CMD ["/bin/bash"]
