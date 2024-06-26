const express = require('express')
const app = express()
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler.js")
const port = 3000

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router);
app.use(errorHandler);

if(process.env.NODE_ENV != "test" && process.env.NODE_ENV != "docker_test" ){
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app;