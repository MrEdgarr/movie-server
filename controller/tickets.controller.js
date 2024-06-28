const pool = require("../config/database");
const ticketsController = {
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query("SELECT tickets.* from tickets");
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
      if (!id || isNaN(id)) {
        return res.status(404).send({
          status: 404,
          success: false,
          message: "Invalid Or Provide User id",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query(
        "SELECT * FROM `tickets` where id = ?",
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
      const { price, schedules_id } = req.body;
      // ----------------------------------- STATUS 500 -----------------------------------
      if (!price || !schedules_id) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
      const sql =
        "INSERT INTO `tickets`( `price`, `schedules_id`) VALUES (?,?)";
      const [rows, fields] = await pool.query(sql, [price, schedules_id]);
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
    try {
      const { price, schedules_id } = req.body;
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
        "UPDATE `tickets` SET `price`='?', `schedules_id`='?' WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [price, schedules_id, id]);
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
        message: "User Details Updated",
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
        "DELETE FROM `tickets` WHERE id = ?",
        [id]
      );
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        success: true,
        message: "User Deleted Successfully",
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

module.exports = ticketsController;
