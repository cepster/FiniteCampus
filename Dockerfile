FROM node:dubnium as builder

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Copy server directory
COPY . .

# Build app

RUN npm run build
###############################

FROM nginx:alpine
RUN ls etc/nginx
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/finite-campus /usr/share/nginx/html/

EXPOSE 80
