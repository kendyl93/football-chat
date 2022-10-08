FROM node:latest
#Copying current dir into container file system 
COPY . /app
#setting working directory in the container
WORKDIR /app
# installing the dependencies into the container
RUN npm install
#container exposed network port number
EXPOSE 3000
#command to run within the container
CMD npm run start