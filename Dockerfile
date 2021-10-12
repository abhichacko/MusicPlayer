FROM php:7.4-apache
LABEL createdby="Sashwat K <sashwat0001@gmail.com>"
LABEL maintainer="Abhilash Thankachan <>"

# Setting up work environment
COPY . /var/www/html
WORKDIR /var/www/html

# Update and upgrade linux container
RUN apt-get -y update --fix-missing
RUN apt-get upgrade -y

# Install useful tools
RUN apt-get -y install apt-utils nano wget dialog