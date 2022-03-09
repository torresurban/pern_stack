//traemos nuestra conexion a nuestra base de datos
const pool = require("../db");

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }
    
}

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);
        if(result.rows.length === 0) return res.status(404).json({message: 'Tarea no encontrada'});

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    //con destructuring extraer las propiedades que vienen del objeto
    const { title, description} = req.body;

    try {
        //ESTA OPERACION ES ASINCRONA. ESTO QUIERE DECIR QUE NUESTRO SERVIDOR NO VA ESPERAR
    //A QUE NUESTRA BASE DE DATOS TERMINE, EL SERVIDOR VA ENVIAR ESTA CONSULTA Y EL
    //VA ESTAR HACIENDO OTRAS COSAS
    //RETURNING * ---> ME DEVUELVE TODOS LOS CAMPOS QUE HAN SIDO INSERTADOS
    const result = await pool.query('INSERT INTO task(title, description) VALUES($1, $2) RETURNING *',[title, description])

    res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE  FROM task WHERE id = $1', [id]);
        if(result.rowCount === 0) return res.status(404).json({message: 'Tarea no encontrada'});
        return res.sendStatus(204);

        
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await pool.query("UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);
        if(result.rows.length === 0) return res.status(404).json({message: 'Tarea no encontrada'});

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}

//'createTask'-->pero primero tenemos que asegurarnos que nos va estar llegando los datos
//para poder ver que datos nos estan enviando hay un objeto especial dentro de la funcion '(req, res)' --> 'req.body'===>que nos permite conocer las informaciones
//que no esta enviando las aplicaciones clientes