const pool = require("../config/database");
const bookingsController = {
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query("SELECT * FROM `bookings`");
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
        "SELECT * FROM `bookings` where id = ?",
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
      const { user_id } = req.body;

      // ----------------------------------- STATUS 500 -----------------------------------
      if (!user_id) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
      const sql =
        "INSERT INTO `bookings`(`user_id`,`create_at`)" +
        " VALUES (?, unix_timestamp(NOW()) )";
      const [rows, fields] = await pool.query(sql, [user_id]);

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
  // update: async (req, res) => {
  //   try {
  //     const { user_id } = req.body;

  //     // ----------------------------------- ID API -----------------------------------
  //     const { id } = req.params;
  //     // ----------------------------------- STATUS 404 -----------------------------------
  //     if (!id) {
  //       return res.status(404).send({
  //         status: 404,
  //         success: false,
  //         message: "Invalid Id Or Provide id",
  //       });
  //     }
  //     // ----------------------------------- QUERY SQL-----------------------------------
  //     const sql =
  //       "UPDATE `bookings` SET `user_id`=?, `update_at`= unix_timestamp(NOW()) WHERE id = ?";
  //     const [rows, fields] = await pool.query(sql, [user_id, id]);
  //     // ----------------------------------- STATUS 500 -----------------------------------
  //     if (!rows) {
  //       return res.status(500).send({
  //         success: false,
  //         message: "Error In Update Data",
  //       });
  //     }
  //     // ----------------------------------- STATUS 200 -----------------------------------
  //     res.status(200).send({
  //       success: true,
  //       message: "Details Updated",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // ----------------------------------- STATUS 500 -----------------------------------
  //     res.status(500).send({
  //       status: 500,
  //       success: false,
  //       message: "Error in Update API",
  //       error,
  //     });
  //   }
  // },
  // ----------------------------------- DELETE API -----------------------------------
  // delete: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     // ----------------------------------- STATUS 404 -----------------------------------
  //     if (!id) {
  //       return res.status(404).send({
  //         status: 404,
  //         success: false,
  //         message: "Please Provide Id or Valid User Id",
  //       });
  //     }
  //     // ----------------------------------- QUERY SQL-----------------------------------
  //     const [rows, fields] = await pool.query(
  //       "DELETE FROM `bookings` WHERE id = ?",
  //       [id]
  //     );
  //     // ----------------------------------- STATUS 200 -----------------------------------
  //     res.status(200).send({
  //       success: true,
  //       message: "Deleted Successfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // ----------------------------------- STATUS 500 -----------------------------------
  //     res.status(500).send({
  //       status: 500,
  //       success: false,
  //       message: "Error in Delete API",
  //       error,
  //     });
  //   }
  // },
};

module.exports = bookingsController;
