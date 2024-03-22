const errorHandler = (err, req, res, next) => {
    console.log("From Error Handler");
    console.log(err);
    res.send(err);
}

module.exports = errorHandler;