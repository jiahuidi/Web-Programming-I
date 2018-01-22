const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const uuidV1 = require('uuid/v1');

let exportedMethods = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    createTask(title, description) {
        if (!title)
            return Promise.reject("You must provide a title for your todoItem");

        if (!description)
            return Promise.reject("You must provide a description for your todoItem");

        return todoItems().then((todoItemCollection) => {
                let newTodoItem = {
                    _id: uuidV1(),
                    title: title,
                    description: description,
                    completed: false,
                    completedAt: null
                };

        return todoItemCollection
                .insertOne(newTodoItem)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getTask(newId);
                });
        });
    },
    getAllTasks() {
        return todoItems().then((todoItemCollection) => {
                return todoItemCollection.find().toArray();
        });
    },
    getTask(id) {
        if (!id)
            return Promise.reject("You must provide an id to search for");

        return todoItems().then((todoItemCollection) => {
                return todoItemCollection.findOne({_id: id});
        });
    },
    removeTask(id) {
        if (!id)
            return Promise.reject("You must provide an id to search for");

        return todoItems().then((todoItemCollection) => {
                return todoItemCollection
                    .removeOne({_id: id})
                    .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw(`Could not delete item with id of ${id}`)
                    }
                });
        });
    },
    completeTask(id) {
        if (!id)
            return Promise.reject("You must provide an id to search for");

        return todoItems().then((todoItemCollection) => {
                return this.getTask(id).then((toCompleteTask) => {
                    let updatedTodoItem = {
                        _id: id,
                        title: toCompleteTask.title,
                        description: toCompleteTask.description,
                        completed: true,
                        completedAt: new Date()
                    };

                    return todoItemCollection.updateOne({_id: id}, updatedTodoItem).then(() => {
                        return this.getTask(id);
                    });
                });
        });
    }
}

module.exports = exportedMethods;