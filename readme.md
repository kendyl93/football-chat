# Start the app

`docker-compose up`

# Docker

- `docker build -t [name] .` - build image with name
- `docker run [NAME]` - run image with exposing port


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

# Redis
You need to have redis installed first(maxOS `brew install redis`).

# TODO

- Add cron job to check if there were any matches/rooms in the db that should be reomved. 
- Add cron job to check if there were any messages that doesnt belong to any chat in the db that should be reomved. 
- Save database messages/rooms and do not erase it on every server visit
- connect jenkins and push to the server
- flow - Create chat ROOM in the db and connect users to it. Then send messages like [{ userName: string, message: 'string'}]
- invastigate how to connect db with socket chat
- use TTL to remove db doc after some time