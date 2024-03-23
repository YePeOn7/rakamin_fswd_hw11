
const {Todo} = require("../models");

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

class TodosController{
    static findAll = async (req, res, next) => {
        try{

            let {limit, page} = req.query;
            limit = +limit || DEFAULT_LIMIT;
            page = +page || DEFAULT_PAGE;

            const param = {
                limit: limit ,
                offset: (page-1)*limit
            }

            const {count, rows} = await Todo.findAndCountAll(param);

            const totalPage = Math.ceil(count / limit);
            const nextPage = page+1 <= totalPage && page > 0 ? page + 1 : null;
            const previousPage = page-1 > 0 && page-1 < totalPage ? page - 1 : null;
            const pageInfo = {
                currentPage: page,
                totalPage: totalPage,
                nextPage: nextPage,
                previousPage: previousPage
            }
            const a = page * limit;

            const data = {
                data: rows,
                pageInfo
            }
            res.status(200).json(data);
        } catch(err){
            next(err);
        }
    }

    static findOne = async (req, res, next) => {
        try{
            const id = req.params.id;

            const filterOption = {
                where:{
                    id
                }
            }

            const data = await Todo.findOne(filterOption);
            res.status(200).json(data);
        } catch(err){
            next(err);
        }
    }

    static create = async (req, res, next) => {
        // res.send("create");
        try{
            const data = await Todo.create(req.body, {returning: true});
            res.status(201).json({message: "Todo list added succesfully", data});
        } catch(err){
            next(err);
        }
    }

    static update = async (req, res, next) => {
        try{
            const {id, title, description} = req.body;

            const todo = await Todo.findOne({
                where:{
                    id
                }
            })

            if(todo){
                const data = await todo.update({
                    title,
                    description
                }, {
                    returning: true
                })

                res.status(201).json({
                    message: "Data has been updated succesfully",
                    data
                });
            }
            else{
                throw {
                    name: "notFound",
                    message: `There is no data with id: ${id}`
                }
            }

        } catch(err){
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try{
            const {id} = req.body;

            const todo = await Todo.findOne({
                where:{
                    id
                }
            })

            if(todo){
                const data = await Todo.destroy({
                    where:{
                        id
                    }
                })

                res.status(201).json({
                    message: `Data with id: ${id} has been deleted succesfully`,
                    data: todo.toJSON()
                });
            }
            else{
                throw {
                    name: "notFound",
                    message: `There is no data with id: ${id}`
                }
            }
        } catch(err){
            next(err);
        }
    }
}

module.exports = TodosController;