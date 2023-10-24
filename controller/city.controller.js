const pool = require("../config/database");
const citysController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                "SELECT citys.*, COUNT(cinemas.cinema_id) AS cinema FROM citys, cinemas WHERE citys.city_id = cinemas.city_id GROUP BY cinemas.city_id"
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
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query(
                "SELECT * FROM `citys` where city_id = ?",
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
            const { city_name } = req.body;
            const sql = "INSERT INTO `citys`( `city_name`) VALUES (?)";
            const [rows, fields] = await pool.query(sql, [city_name]);
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
            const { city_name } = req.body;
            const { id } = req.params;
            const sql = "UPDATE `citys` SET `city_name`='?' WHERE city_id = ?";
            const [rows, fields] = await pool.query(sql, [city_name, id]);
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
                "DELETE FROM `citys` WHERE city_id = ?",
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

module.exports = citysController;
