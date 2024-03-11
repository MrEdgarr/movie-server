const pool = require("../config/database");
const bookingsDetailController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                "SELECT * FROM `booking_detail`"
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
                "SELECT * FROM `booking_detail` where id = ?",
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
            const { booking_id, tickets_id, seats_id } = req.body;
            const sql =
                "INSERT INTO `booking_detail`(`booking_id`, `tickets_id`, `seats_id`) VALUES (?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [
                booking_id,
                tickets_id,
                seats_id,
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
            const { booking_id, tickets_id, seats_id } = req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `booking_detail` SET `booking_id`=?, `tickets_id`=?, `seats_id`=? WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [
                booking_id,
                tickets_id,
                seats_id,
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
                "DELETE FROM `booking_detail` WHERE id = ?",
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

module.exports = bookingsDetailController;
