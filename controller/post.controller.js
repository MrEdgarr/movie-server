const pool = require("../dbconfig");
const postsController = {
    getAll: async (req, res) => {
        console.log("as");
        try {
            const [rows, fields] = await pool.query("select * from movies");
            res.json({
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
