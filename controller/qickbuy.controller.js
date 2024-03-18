const pool = require("../config/database");
const qickbuyController = {
    getAllByMovie: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(req.params);
            const [rows, fields] = await pool.query(
                "SELECT cinemas.* FROM cinemas INNER JOIN rooms t1 ON t1.cinema_id = cinemas.id INNER JOIN schedules t2 ON t2.room_id = t1.id INNER JOIN movies t3 ON t3.id = t2.movie_id WHERE t3.id = ? GROUP BY cinemas.id",
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
    getDateByMovieCinema: async (req, res) => {
        try {
            const { id, cid } = req.params;
            console.log(req.query);
            const [rows, fields] = await pool.query(
                "SELECT schedules.* FROM schedules INNER JOIN movies t1 ON t1.id = schedules.movie_id INNER JOIN rooms t2 ON t2.id = schedules.room_id INNER JOIN cinemas t3 on t3.id = t2.cinema_id WHERE t1.id = ? and t3.id = ? GROUP by DATE_FORMAT(schedules.start_time, '%d/%m/%Y')",
                [id, cid]
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
    getscheduleByMovieCinema: async (req, res) => {
        try {
            const { id, cid, dateid } = req.params;
            console.log(req.params);
            const [rows, fields] = await pool.query(
                "SELECT schedules.* FROM schedules INNER JOIN movies t1 ON t1.id = schedules.movie_id INNER JOIN rooms t2 ON t2.id = schedules.room_id INNER JOIN cinemas t3 on t3.id = t2.cinema_id WHERE t1.id = ? and t3.id = ? and DATE_FORMAT(schedules.start_time, '%d-%m-%Y') = ?",
                [id, cid, dateid]
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

module.exports = qickbuyController;
