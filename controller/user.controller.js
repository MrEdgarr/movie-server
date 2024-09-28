const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const SELECT_SQL =
  "users.id, users.user_name, users.password, users.user_email, users.user_phone, " +
  "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(users.last_logged_at), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as last_logged_at," +
  "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(users.update_at), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as update_at," +
  "DATE_FORMAT( CONVERT_TZ(FROM_UNIXTIME(users.create_at), @@session.time_zone, '+07:00'), '%H:%i:%s %d/%m/%Y') as create_at";
const usersController = {
  // ----------------------------------- LOGIN USER -----------------------------------
  login: async (req, res) => {
    try {
      const { user_email, password } = req.body;
      if (!user_email || !password) {
        return res.status(500).send({
          success: false,
          message: "Vui lòng cung cấp Email hoặc mật khẩu",
        });
      }
      const [exiting] = await pool.query(
        `SELECT ${SELECT_SQL} FROM users WHERE user_email = ? and password = ?`,
        [user_email, password]
      );

      // UPDATE LAST LOGGED AT
      await pool.query(
        "UPDATE `users` SET `last_logged_at`= unix_timestamp(NOW())"
      );

      if (exiting.length == 0) {
        return res.status(500).send({
          success: false,
          message: "Tên người dùng và/hoặc mật khẩu không đúng!",
        });
      }

      const token = jwt.sign(
        {
          id: exiting[0].id,
        },
        "your_jwt_secret",
        {
          expiresIn: "6h",
        }
      );

      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        message: "Đăng nhập thành công",
        access_token: token,
        data: exiting[0],
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Get All API",
        error: error,
      });
    }
  },
  // ----------------------------------- GET ALL API -----------------------------------
  getAll: async (req, res) => {
    try {
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query(
        `SELECT ${SELECT_SQL} FROM users`
      );
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "No Records found",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        message: "success",
        data: rows,
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Get All API",
        error: error,
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
          success: false,
          message: "Invalid id",
        });
      }
      // ----------------------------------- QUERY SQL -----------------------------------
      const [rows, fields] = await pool.query(
        `SELECT ${SELECT_SQL} FROM users where id = ?`,
        [id]
      );
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!rows) {
        return res.status(404).send({
          success: false,
          message: "No Records found",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        message: "success",
        data: rows,
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Get by id API",
        error: error,
      });
    }
  },
  // ----------------------------------- REGISTER USER -----------------------------------
  create: async (req, res) => {
    try {
      const { user_name, password, user_email, user_phone, passwordConfirm } =
        req.body;

      // ----------------------------------- STATUS 500 -----------------------------------
      if (
        !user_name ||
        !password ||
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
          message: "Email đã tồn tại",
        });
      } else if (password !== passwordConfirm) {
        return res.status(500).send({
          success: false,
          message: "Mật khẩu không khớp",
        });
      }

      // ----------------------------------- QUERY SQL -----------------------------------
      const sql =
        "INSERT INTO `users`(`user_name`, `password`, `user_email`,  `user_phone`, `create_at`) VALUES (?,?,?,?, unix_timestamp(NOW()))";
      const [rows, fields] = await pool.query(sql, [
        user_name,
        password,
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
        message: "Đăng kí thành công",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Create API",
        error: error,
      });
    }
  },
  // ----------------------------------- PUT API -----------------------------------
  update: async (req, res) => {
    try {
      const { user_name, password, user_email, user_phone } = req.body;
      // ----------------------------------- ID API -----------------------------------
      const { id } = req.params;
      // ----------------------------------- STATUS 404 -----------------------------------
      if (!id) {
        return res.status(404).send({
          success: false,
          message: "Invalid id",
        });
      }
      // ----------------------------------- QUERY SQL-----------------------------------
      const sql =
        "UPDATE `users` SET `user_name`=?,`password`=?, `user_email`=?,`user_phone`=?, `update_at`= unix_timestamp(NOW()) WHERE id = ?";
      const [rows, fields] = await pool.query(sql, [
        user_name,
        password,
        user_email,
        user_phone,
        id,
      ]);
      // ----------------------------------- STATUS 500 -----------------------------------
      if (!rows) {
        return res.status(500).send({
          success: false,
          message: "Lỗi trong việc cập nhật dữ liệu",
        });
      }
      // ----------------------------------- STATUS 200 -----------------------------------
      res.status(200).send({
        success: true,
        message: "Cập nhật thành công",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Update API",
        error: error,
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
          success: false,
          message: "Please Provide Id",
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
        message: "Đã xóa thành công",
      });
    } catch (error) {
      console.log(error);
      // ----------------------------------- STATUS 500 -----------------------------------
      res.status(500).send({
        success: false,
        message: "Error in Delete API",
        error: error,
      });
    }
  },
};

module.exports = usersController;
