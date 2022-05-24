# Docker

- `docker-compose build` - build from docker-compose
- `docker-compose up` - run build from docker-compose

- `docker build . -t [NAME]` - build container with name
- `docker run --init -p 3000:3000 -d  [NAME]` - run container with exposing port
- `docker ps` - get container id
- `docker exec -it [CONTAINER_ID] /bin/bash` - go into the container
- `docker kill [CONTAINER_ID]` - kill docker container


# TODO
- dockerizing mongodb
- invastigate how to connect db with socket chat
- create db doc on app request
- use TTL to remove db doc after some time