const List = require("./models").List;
const Card = require("./models").Card;
const collaboratorQueries = require("./queries.collaborators")
//const Authorizer = require("../policies/list");

module.exports = {

    getAllLists(callback){
        return List.all()
        .then((lists) => {
            callback(null, lists);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getList(id, callback){

        return List.findById(id, {
            include: [{
                model: Card,
                as: "cards"
            }]
        })
        .then((list) => {
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addList(newList, callback){
        
        return List.create({
            title: newList.title,
            description: newList.description
        })
        .then((list) => {
            callback(null, list);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateList(req, updatedList, callback){
        return List.findById(req.params.id)
        .then((list) => {
            if(!list){
                return callback("List not found");
            }
            else {
   
                list.update(updatedList, {
                    fields: Object.keys(updatedList)
                })
                .then(() => {
                    callback(null, list);
                })
                .catch((err) => {
                    callback(err);
                });
            }
        });
    },

    deleteList(req, callback){
        return List.findById(req.params.id)
        .then((list) => {
                list.destroy()
                .then((res) => {
                    callback(null, list);
                });
        })
        .catch((err) => {
            callback(err);
        });
    }
}
