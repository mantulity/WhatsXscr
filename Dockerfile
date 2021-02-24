FROM fusuf/whatsasena:latest
RUN apk update && apk upgrade -y

RUN git clone https://github.com/mabotsss/WhatsXscr /root/WhatsXscr
WORKDIR /root/WhatsXscr/
ENV TZ=Asia/Jakarta
RUN npm install deepai
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
