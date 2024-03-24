# rakamin_fswd_hw11

## Init For Development

From root repo

```bash
# Init porject
cd project
npm init
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# run project
npm run dev
```

## Init For Testing

From root repo

```bash
cd project
npm init
npx sequelize-cli db:create --env test
npx sequelize-cli db:migrate --env test
npx sequelize-cli db:seed:all --env test

# run project
npm run test
```

## Init with docker

From root repo

```bash
cd project
sudo docker compose up -d

# enter docker console of w11 container
sudo docker exec -it w11 sh

# inside the docker container of w11

```
