const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3003;
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getdata", (req, res) => {
  const sqlGetAllData = "SELECT * FROM contact_db";
  db.query(sqlGetAllData, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlPost = "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
  db.query(sqlPost, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM contact_db WHERE id = ?";
  db.query(sqlDelete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGetSingleContact = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGetSingleContact, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`app running on port ${PORT}`);
});
