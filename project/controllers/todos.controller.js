
const {Todo} = require("../models");

class TodosController{
    static findAll = async (req, res, next) => {
        try{
            const {limit, page} = req.body;

            const count = await Todo.count();
            const totalPage = Math.ceil(count / limit);
            const nextPage = page+1 <= totalPage && page > 0 ? page +1 : null;
            const pageInfo = {
                currentPage: page,
                totalPage: totalPage,
                nextPage: nextPage
            }
            const a = page * limit;
            const param = {
                limit: 2,
                offset: 2
            }
            const data = await Todo.findAll(param);
            console.log(pageInfo, "<<<<");
            res.status(200).json(data);
        } catch(err){
            next(err);
        }
        
    }

    static findOne = async (req, res, next) => {
        // res.send("findOne");
        try{

        } catch(err){
            next(err);
        }
    }

    static create = async (req, res, next) => {
        // res.send("create");
        try{

        } catch(err){
            next(err);
        }
    }

    static update = async (req, res, next) => {
        // res.send("update");
        try{

        } catch(err){
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        // res.send("delete");
        // next({name: "Error Test"});
        try{

        } catch(err){
            next(err);
        }
    }
}

module.exports = TodosController;