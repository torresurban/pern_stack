//en este archivo vamos a definir las urls que el frontend va poder utilizar
//por ejemplo cuando quiera crear un dato, eliminar, actualizar , etc. va tener
//que visitar alguna de estas urls

//importamos desde express una funcion llamada Router
const { Router } = require("express");
//luego ejecutamos la funcion Router que nos devolvera un objeto 'router'

const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
} = require("../controllers/tasks.controller");



//el objeto router nos permitira crear nuevas urls
const router = Router();

//creando una simple url
router.get("/tasks", getAllTasks);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);

module.exports = router;
