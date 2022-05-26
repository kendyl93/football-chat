# Docker

- `docker-compose build` - build from docker-compose
- `docker-compose up` - run build from docker-compose

- `docker build . -t [NAME]` - build container with name
- `docker run --init -p 3000:3000 -d  [NAME]` - run container with exposing port
- `docker ps` - get container id
- `docker exec -it [CONTAINER_ID] /bin/bash` - go into the container
- `docker kill [CONTAINER_ID]` - kill docker container

# Database

Run mongo locally:

0. Install mongo
1. `sudo mkdir -p /System/Volumes/Data/data/db` - create `/data/db` path
2. ``sudo chown -R `id -un` /System/Volumes/Data/data/db`` - Add permissions
3. `brew services run mongodb-community` - Start mongodb
4. `brew services list` - check running services
5. `mongo` - Enter inside mongo shell

STOP DB: `brew services stop mongodb-community`

# TODO

- dockerize local mongodb - DONE
- add env variables
- flow - Create chat ROOM in the db and connect users to it. Then send messages like [{ userName: string, message: 'string'}]
- invastigate how to connect db with socket chat
- use TTL to remove db doc after some time