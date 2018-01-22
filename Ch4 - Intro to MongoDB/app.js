const todo = require("./todo");
const connection = require("./mongoConnection");

let addFirstTodoItem = todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

let firstTodoItem = addFirstTodoItem.then((firstItem) => {
        console.log("the first task has been added, now it will blog!");
        console.log(firstItem);
        //console.log(firstItem._id);

        let addSecondTodoItem = todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");

        let secondTodoItem = addSecondTodoItem.then((secondItem) => {
                console.log("\nthe second task has been added, now it will blog!");
                console.log(secondItem);

                let getTodoItems = todo.getAllTasks();

                let todoItems = getTodoItems.then((allItems) => {
                        console.log("\nshow all tasks:");
                        console.log(allItems);

                        return {firstItemId: allItems[0]._id, secondItemId: allItems[0]._id};
                }).then((itemsId) => {
                        let removeTheFirstItem = todo.removeTask(itemsId.firstItemId);
                        return todo.getAllTasks();
                }).then((remainingItem) => {
                        console.log("\nshow the task after remove the first one:");
                        console.log(remainingItem);

                        return todo.completeTask(remainingItem[0]._id);
                }).then((completeItem) => {
                        console.log("\nshow the completed remaining task:");
                        console.log(completeItem);
                        return todo.removeTask(completeItem._id);
                }).catch().then(() => {
                        return connection();
                }).then((db) => {
                        return db.close();
                });
        });

});
