const pool = require("../config/database");
const commentsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                "SELECT comments.* from comments"
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
                "SELECT * FROM `comments` where id = ?",
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
            const { user_id, movie_id, content, rate } = req.body;
            const sql =
                "INSERT INTO `comments`( `user_id`, `movie_id`, `content`, `rate`) VALUES (?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [
                user_id,
                movie_id,
                content,
                rate,
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
            const { user_id, movie_id, content, rate } = req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `comments` SET `user_id`=?, `movie_id`=?, `content`=?, `rate`= ? , `update_at`= CURRENT_TIMESTAMP WHERE id = ?";
            const [rows, fields] = await pool.query(sql, [
                user_id,
                movie_id,
                content,
                rate,
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
                "DELETE FROM `comments` WHERE id = ?",
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

module.exports = commentsController;
