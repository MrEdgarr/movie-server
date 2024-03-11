const pool = require("../config/database");
const usersController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM `users`");
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
                "SELECT * FROM `users` where id = ?",
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
            const {
                username,
                password,
                user_birthday,
                user_gender,
                user_email,
                user_phone,
                last_logged_at,
            } = req.body;
            const sql =
                "INSERT INTO `users`(`username`, `password`, `user_birthday`, `user_gender`, `user_email`,  `user_phone`, `last_logged_at`) VALUES (?,?,?,?,?,?,?)";
            const [rows, fields] = await pool.query(sql, [
                username,
                password,
                user_birthday,
                user_gender,
                user_email,
                user_phone,
                last_logged_at,
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
            const {
                username,
                password,
                user_birthday,
                user_gender,
                user_email,
                user_phone,
                last_logged_at,
            } = req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `users` SET `username`=?,`password`=?, `user_birthday`=?,`user_gender`=?,`user_email`=?,`user_phone`=?',`last_logged_at`=?' WHERE ?";
            const [rows, fields] = await pool.query(sql, [
                username,
                password,
                user_birthday,
                user_gender,
                user_email,
                user_phone,
                last_logged_at,
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
                "DELETE FROM `users` WHERE id =  ?",
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

module.exports = usersController;
