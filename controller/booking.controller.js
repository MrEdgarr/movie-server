const pool = require("../config/database");
const bookingsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `bookings`");
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
                "SELECT * FROM `bookings` where booking_id = ?",
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
            const { user_id, schedule_id, seat_id, price, seat_status } =
                req.body;
            const sql =
                "INSERT INTO `bookings`(`user_id`, `schedule_id`, `seat_id`, `price`, `seat_status`) VALUES (?,?,?,?,?)";
            const [rows, fields] = await pool.query(sql, [
                user_id,
                schedule_id,
                seat_id,
                price,
                seat_status,
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
            const { user_id, schedule_id, seat_id, price, seat_status } =
                req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `bookings` SET `user_id`=?,`schedule_id`=?,`seat_id`=?,`price`=?,`seat_status`=? WHERE booking_id = ?";
            const [rows, fields] = await pool.query(sql, [
                user_id,
                schedule_id,
                seat_id,
                price,
                seat_status,
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
                "DELETE FROM `bookings` WHERE booking_id = ?",
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

module.exports = bookingsController;
