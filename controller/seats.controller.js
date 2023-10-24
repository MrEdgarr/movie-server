const pool = require("../config/database");
const seatsController = {
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query(
                "SELECT seats.* FROM seats, rooms WHERE seats.room_id = rooms.room_id and seats.room_id = ?;",
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

module.exports = seatsController;
