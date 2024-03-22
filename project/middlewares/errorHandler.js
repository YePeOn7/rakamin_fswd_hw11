const errorHandler = (error, req, res, next) => {
    if(error.name === "badRequest"){
        res.status(400).json(err);
    }
    else if(error.name === "notFound"){
        res.status(404).json(error);
    }
    else{
        res.status(500).json({message: "Internal Server Error", error});
    }
}

module.exports = errorHandler;

