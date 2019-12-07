# ./docker/php/Dockerfile
FROM node:buster-slim

ARG user
ARG user_id
ARG app_path

RUN apt-get update && apt-get install -y curl procps inetutils-ping net-tools iproute2 git vim vim-tiny sudo
RUN useradd -g users -G root,www-data,sudo -u ${user_id} ${user} -s /bin/bash
RUN echo "%sudo   ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers

WORKDIR ${app_path}
CMD ["tail", "-f", "/dev/null"]
