const pool = require("../config/database");
const postsController = {
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query("select * from movies");
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "No Records found",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        status: 200,
        success: true,
        message: "All Records",
        totalUsers: rows.length,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        status: 500,
        success: false,
        message: "Error in Get All API",
        error,
      });
    }
  },
  // ----------------------------------- GET ID API -----------------------------------
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!id) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "Invalid Or Provide id",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query(
        "select * from movies where id = ?",
        [id]
      );
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "No Records found",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        status: 200,
        success: true,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        status: 500,
        success: false,
        message: "Error in Get by id API",
        error,
      });
    }
  },
  // ----------------------------------- POST API -----------------------------------
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
      // ----------------------------------- STATUS 500 -----------------------------------
      if (
        !movie_name ||
        !movie_description ||
        !movie_trailer ||
        !movie_cens ||
        !movie_genres ||
        !movie_release ||
        !movie_lenght ||
        !movie_format ||
        !movie_poster ||
        !movie_backdrop ||
        !movie_production_countries ||
        !movie_spoken_languages ||
        !movie_vote_average
      ) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
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
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "Error In INSERT QUERY",
        });
      }
      // ----------------------------------- STATUS 201 -----------------------------------
      res.status(201).send({
        success: true,
        message: "New Record Created",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        status: 500,
        success: false,
        message: "Error in Create API",
        error,
      });
    }
  },
  // ----------------------------------- PUT API -----------------------------------
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
      // ----------------------------------- ID API -----------------------------------
      const { id } = req.params;
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!id) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "Invalid Id Or Provide id",
        });
      }
      // ----------------------------------- QUERY SQL-----------------------------------
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
      // ----------------------------------- STATUS 500 -----------------------------------
      if (!rows) {
        return res.status(500).send({
          success: false,
          message: "Error In Update Data",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        success: true,
        message: "Details Updated",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        status: 500,
        success: false,
        message: "Error in Update API",
        error,
      });
    }
  },
  // ----------------------------------- DELETE API -----------------------------------
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!id) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "Please Provide Id or Valid User Id",
        });
      }
      // ----------------------------------- QUERY SQL-----------------------------------
      const [rows, fields] = await pool.query(
        "DELETE FROM `movies` WHERE movie_id = ?",
        [id]
      );
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        success: true,
        message: "Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        status: 500,
        success: false,
        message: "Error in Delete API",
        error,
      });
    }
  },
};
module.exports = postsController;
