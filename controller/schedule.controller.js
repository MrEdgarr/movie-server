const pool = require("../config/database");
const scheduleController = {
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      //  const test =
      //  "SELECT d.cinema_id, d.city_id, d.cinema_name, d.cinema_address, d.cinema_phone, ( JSON_ARRAYAGG( JSON_OBJECT( 'schedule_id', d.id, 'schedule_start', d.start_time ) ) ) cinema_data FROM ( SELECT cinemas.id AS cinema_id, cinemas.city_id, cinemas.cinema_name, cinemas.cinema_address, cinemas.cinema_phone, schedules.* FROM schedules schedules INNER JOIN rooms rooms ON rooms.id = schedules.room_id INNER JOIN cinemas cinemas ON cinemas.id = rooms.cinema_id INNER JOIN movies movies ON movies.id = schedules.movie_id WHERE movies.id = 10 ) d GROUP BY d.cinema_id, d.cinema_name;";
      const test =
        "SELECT o.city_id, o.city_name, ( JSON_ARRAYAGG( JSON_OBJECT( 'cinema_id', o.cinema_id, 'city_id', o.city_id, 'cinema_name', o.cinema_name, 'cinema_phone', o.cinema_phone, 'cinema_address', o.cinema_address, 'results', o.schedules ) ) ) cinema_data FROM ( SELECT d.cinema_id, d.city_id, d.cinema_name, d.cinema_address, d.cinema_phone, d.city_name, ( JSON_ARRAYAGG( JSON_OBJECT( 'schedule_id', d.id, 'schedule_start', d.start_time, 'movie_id', d.movie_id, 'room_id', d.room_id, 'end_time', d.end_time ) ) ) schedules FROM ( SELECT cinemas.id AS cinema_id, cinemas.city_id, cinemas.cinema_name, cinemas.cinema_address, cinemas.cinema_phone, citys.city_name, schedules.* FROM schedules schedules INNER JOIN rooms rooms ON rooms.id = schedules.room_id INNER JOIN cinemas cinemas ON cinemas.id = rooms.cinema_id INNER JOIN movies movies ON movies.id = schedules.movie_id INNER JOIN citys citys ON citys.id = cinemas.city_id ) d GROUP BY d.cinema_id, d.cinema_name ) o GROUP BY o.city_id, o.city_name";

      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query(test);
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
    console.log(req.query);
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
        "SELECT * FROM `schedules` where id = ?",
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
  // ----------------------------------- CREATE SCHEDULE -----------------------------------
  create: async (req, res) => {
    try {
      const { movie_id, room_id, start_time, end_time } = req.body;

      // ----------------------------------- STATUS 500 -----------------------------------
      if (!movie_id || !room_id || !start_time || !end_time) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }

      const [exiting] = await pool.query(
        "SELECT * FROM `schedules` WHERE schedules.room_id = ? " +
          "AND unix_timestamp(?) + 1 BETWEEN schedules.start_time and schedules.end_time " +
          "OR schedules.room_id = ? " +
          "AND unix_timestamp(?) - 1 BETWEEN schedules.start_time and schedules.end_time ",
        [room_id, start_time, room_id, end_time]
      );
      if (exiting.length > 0 || start_time == end_time) {
        return res.status(500).send({
          success: false,
          message: "Showtime already exists",
        });
      }

      // ----------------------------------- QUERY SQL -----------------------------------
      const sql =
        "INSERT INTO `schedules`( `movie_id`, `room_id`, `start_time`, `end_time`) VALUES  (?,?,unix_timestamp(?),unix_timestamp(?))";
      const [rows, fields] = await pool.query(sql, [
        movie_id,
        room_id,
        start_time,
        end_time,
      ]);
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "Error In INSERT QUERY",
        });
      }
      console.log(rows);
      // // ----------------------------------- STATUS 201 -----------------------------------
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
  // ----------------------------------- PUT SCHEDULE -----------------------------------
  update: async (req, res) => {
    try {
      const { movie_id, room_id, start_time, end_time } = req.body;
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

      const [exiting] = await pool.query(
        "SELECT * FROM `schedules` WHERE NOT schedules.id = ? AND schedules.room_id = ? " +
          "AND unix_timestamp(?) + 1 BETWEEN schedules.start_time and schedules.end_time " +
          "OR NOT schedules.id = ? AND schedules.room_id = ? " +
          "AND unix_timestamp(?) - 1 BETWEEN schedules.start_time and schedules.end_time ",
        [id, room_id, start_time, id, room_id, end_time]
      );
      if (exiting.length > 0 || start_time == end_time) {
        return res.status(500).send({
          success: false,
          message: "Showtime already exists",
        });
      }
      // ----------------------------------- QUERY SQL-----------------------------------
      const sql =
        "UPDATE `schedules` SET `movie_id`=?,`room_id`=?, `start_time`=unix_timestamp(?),`end_time`=unix_timestamp(?) WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [
        movie_id,
        room_id,
        start_time,
        end_time,
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
        "DELETE FROM `schedules` WHERE id =  ?",
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

module.exports = scheduleController;
