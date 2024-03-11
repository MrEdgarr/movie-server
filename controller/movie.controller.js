const pool = require("../config/database");
const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from movies");
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
                "select * from movies where id = ?",
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
                movie_name,
                movie_description,
                movie_trailer,
                movie_cens,
                movie_genres,
                movie_release,
                movie_lenght,
                movie_format,
                movie_poster,
                movie_backdrop,
                movie_production_countries,
                movie_spoken_languages,
                movie_vote_average,
            } = req.body;
            const sql =
                "INSERT INTO `movies`(`movie_name`, `movie_description`, `movie_trailer`, `movie_cens`, `movie_genres`, `movie_release`, `movie_lenght`, `movie_format`, `movie_poster`, `movie_backdrop`, `movie_production_countries`, `movie_spoken_languages`, `movie_vote_average`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
            const [rows, fields] = await pool.query(sql, [
                movie_name,
                movie_description,
                movie_trailer,
                movie_cens,
                movie_genres,
                movie_release,
                movie_lenght,
                movie_format,
                movie_poster,
                movie_backdrop,
                movie_production_countries,
                movie_spoken_languages,
                movie_vote_average,
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
        console.log(req.params);
        try {
            const {
                movie_name,
                movie_description,
                movie_trailer,
                movie_cens,
                movie_genres,
                movie_release,
                movie_lenght,
                movie_format,
                movie_poster,
                movie_backdrop,
                movie_production_countries,
                movie_spoken_languages,
                movie_vote_average,
            } = req.body;
            const { id } = req.params;
            const sql =
                "UPDATE `movies` SET `movie_name`=?,`movie_description`=?,`movie_trailer`=?,`movie_cens`=?,`movie_genres`=?,`movie_release`=?,`movie_lenght`=?,`movie_format`=?,`movie_poster`=?,`movie_backdrop`=?,`movie_production_countries`=?,`movie_spoken_languages`=?,`movie_vote_average`=? WHERE movie_id=?";
            const [rows, fields] = await pool.query(sql, [
                movie_name,
                movie_description,
                movie_trailer,
                movie_cens,
                movie_genres,
                movie_release,
                movie_lenght,
                movie_format,
                movie_poster,
                movie_backdrop,
                movie_production_countries,
                movie_spoken_languages,
                movie_vote_average,
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
                "DELETE FROM `movies` WHERE movie_id = ?",
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
module.exports = postsController;
