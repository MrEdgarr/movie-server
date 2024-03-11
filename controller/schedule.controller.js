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
                "SELECT * FROM `schedules` where id = ?",
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
};

module.exports = citysController;
