const pool = require("../config/database");
const usersController = {
  // ----------------------------------- LOGIN USER -----------------------------------
  loginController: async (req, res) => {
    try {
      const { user_email, password } = req.body;
      if (!user_email || !password) {
        return res.status(500).send({
          success: false,
          message: " Please Provide Email Or Password",
        });
      }
      const [exiting] = await pool.query(
        "SELECT * FROM `users` WHERE user_email = ? and password = ?",
        [user_email, password]
      );
      if (exiting.length == 0) {
        return res.status(500).send({
          success: false,
          message: "Incorrect Username and/or Password!",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        status: 200,
        success: true,
        message: "Logged in successfully",
        data: exiting,
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
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query("SELECT * FROM `users`");
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
        "SELECT * FROM `users` where id = ?",
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
  // ----------------------------------- REGISTER USER -----------------------------------
  create: async (req, res) => {
    try {
      const {
        user_name,
        password,
        user_birthday,
        user_email,
        user_phone,
        passwordConfirm,
      } = req.body;

      // ----------------------------------- STATUS 500 -----------------------------------
      if (
        !user_name ||
        !password ||
        !user_birthday ||
        !user_email ||
        !user_phone ||
        !passwordConfirm
      ) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }

      const [exiting] = await pool.query(
        "SELECT * FROM `users` WHERE user_email = ? ",
        [user_email]
      );
      if (exiting.length > 0) {
        return res.status(500).send({
          success: false,
          message: "Email Already",
        });
      } else if (password !== passwordConfirm) {
        return res.status(500).send({
          success: false,
          message: "Passwords do not match",
        });
      }

      // ----------------------------------- QUERY SQL -----------------------------------
      const sql =
        "INSERT INTO `users`(`user_name`, `password`, `user_birthday`, `user_email`,  `user_phone`,`create_at`) VALUES (?,?,?,?,?, unix_timestamp(NOW()))";
      const [rows, fields] = await pool.query(sql, [
        user_name,
        password,
        user_birthday,
        user_email,
        user_phone,
      ]);
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "Error In INSERT QUERY",
        });
      }
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
  // ----------------------------------- PUT API -----------------------------------
  update: async (req, res) => {
    try {
      const {
        user_name,
        password,
        user_birthday,
        user_email,
        user_phone,
        last_logged_at,
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
      var curDate = new Date(+7);
      // ----------------------------------- QUERY SQL-----------------------------------
      const sql =
        "UPDATE `users` SET `user_name`=?,`password`=?, `user_birthday`=?,`user_email`=?,`user_phone`=?,`last_logged_at`=?, `update_at`= ? WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [
        user_name,
        password,
        user_birthday,
        user_email,
        user_phone,
        last_logged_at,
        curDate,
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
        "DELETE FROM `users` WHERE id =  ?",
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

module.exports = usersController;
