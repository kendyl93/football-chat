# Docker

- `docker build . -t [NAME]` - build container with name
- `docker run --init -p 3000:3000 -d  [NAME]` - run container with exposing port
- `docker ps` - get container id
- `docker exec -it [CONTAINER_ID] /bin/bash` - go into the container
- `docker kill [CONTAINER_ID]` - kill docker container