const pool = require("../config/database");
const cinemasController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `cinemas`");
            res.json({
                status: 200,
                message: "Get data has successfully",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error",
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query(
                "SELECT * FROM `cinemas` WHERE id =  ?",
                [id]
            );
            res.json({
                status: 200,
                message: "Get data has successfully",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error",
            });
        }
    },
    create: async (req, res) => {
        try {
            const { city_id, cinema_name, cinema_address, cinema_phone } =
                req.body;
            const sql =
                "INSERT INTO `cinemas`( `city_id`, `cinema_name`, `cinema_address`, `cinema_phone`) VALUES (?,?,?,?)";
            const [rows, fields] = await pool.query(sql, [
                city_id,
                cinema_name,
                cinema_address,
                cinema_phone,
            ]);
            res.json({
                status: 200,
                message: "Get data has successfully",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error",
            });
        }
    },
    update: async (req, res) => {
        try {
            const { city_id, cinema_name, cinema_address, cinema_phone } =
                req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `cinemas` SET `city_id`='?',`cinema_name`='?',`cinema_address`='?',`cinema_phone`='?' WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [
                city_id,
                cinema_name,
                cinema_address,
                cinema_phone,
                ,
                id,
            ]);
            res.json({
                status: 200,
                message: "Get data has successfully",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error",
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query(
                "DELETE FROM `cinemas` WHERE id = ?",
                [id]
            );
            res.json({
                status: 200,
                message: "Get data has successfully",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error",
            });
        }
    },
};

module.exports = cinemasController;
