require('dotenv').config()

const config = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DB,
    host: process.env.TEST_HOST,
    dialect: 'postgres',
    logging: false
  },
  docker: {
    username: process.env.DOCKER_PG_USER,
    password: process.env.DOCKER_PG_PASSWORD,
    database: process.env.DOCKER_PG_DB,
    host: process.env.DOCKER_PG_HOST,
    dialect: 'postgres',
    // logging: false,
    // port: 5433
  },
  docker_test: {
    username: process.env.DOCKER_TEST_USER,
    password: process.env.DOCKER_TEST_PASSWORD,
    database: process.env.DOCKER_TEST_DB,
    host: process.env.DOCKER_TEST_HOST,
    dialect: 'postgres',
    // logging: false,
    // port: 5433
  }
};

module.exports = config
