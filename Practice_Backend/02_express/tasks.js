// Making a crud application of task list
// 1 - Add a new task
// 2 - Update a already exiting task as completed
// 3 - Check the task list
// 4 - Delete a task

import express from "express";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

app.use(express.json()); // Used to accept the JSON data from postman
let taskList = [];
let taskId = 1;

// Creating routes
// 1 - Adding a new task.
app.post("/tasks", (req, res) => {
  const {name, completed} = req.body;
  const newTask = {id: taskId++, name, completed};
  taskList.push(newTask);
  res.status(200).send(newTask);
});

// Updating a task
app.put("/tasks/:id", (req, res) => {
  const {name, completed} = req.body;
  const task = taskList.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    res.statusCode = 404;
    res.send("404 | Task does not exists!");
  } else {
    task.name = name;
    task.completed = completed;
    res.status(201).send(task);
  }
});

// Getting all the tasks
app.get("/tasks", (req, res) => {
  res.status(200).send(taskList);
});

// Deleting a task
app.delete("/tasks/:id", (req, res) => {
  const index = taskList.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send("Error 404 | No data found!");
  } else {
    taskList.splice(index, 1);
    res.status(202).send("Deletion Successfull");
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is running at port ${port}`);
});
