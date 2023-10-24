const pool = require("../config/database");
const citysController = {
    getAll: async (req, res) => {
        console.log(req.body);
        try {
            const [rows, fields] = await pool.query(
                "SELECT * FROM `schedules`"
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
        console.log(req.query);
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query(
                "SELECT * FROM `schedules` where schedule_id = ?",
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
    getByDate: async (req, res) => {
        console.log(req.params);
        try {
            const { id, date } = req.params;
            const [rows, fields] = await pool.query(
                "SELECT schedules.* FROM schedules INNER JOIN rooms ON rooms.room_id = schedules.room_id and rooms.cinema_id = ? and FROM_UNIXTIME(schedules.schedule_date, '%d/%m') = ?;",
                [id, date]
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
            const { movie_id, room_id, schedule_date } = req.body;
            const date = new Date().getTime() / 1000;
            const sql =
                "INSERT INTO `schedules`( `movie_id`, `room_id`, `schedule_date`, `schedule_add`) VALUES (?,?,?, UNIX_TIMESTAMP(NOW()))";
            const [rows, fields] = await pool.query(sql, [
                movie_id,
                room_id,
                schedule_date,
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
