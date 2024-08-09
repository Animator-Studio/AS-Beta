const express = require("express");
const { Client } = require("pg");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use('/resources/home', express.static(path.join(__dirname, "pages", "home")));

let Database = {
  connect: function () {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: true,
    });
    this.isConnected = true;
    return client;
  },
  disconnect: function (client) {
    client.end();
  },
  isConnected: false,
};

app.get("/", (req, res) => {
  // Path to the file you want to serve
  const filePath = path.join(__dirname, "pages", "home", "component.html");

  // Read the file and send it as a response
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("We aren't able to fetch that file.");
      console.error(err);
      return;
    }
    res.send(data);
  });
});

// Endpoint to fetch file data
app.get("/internal/getfiles.blazgo", (req, res) => {
  let db = Database.connect();

  db.query("SELECT * FROM Animator_Files", (err, result) => {
    if (err) {
      console.error(err.stack);
      res.status(500).send("Error fetching data");
    } else {
      res.json(result);
    }
  });
});

// Route for /somepage
app.get("/somepage", async (req, res) => {
  try {
    console.log("Connecting to database...");
    await client.connect();
    console.log("Connected to database.");

    console.log("Creating table...");
    await client.query(`
  CREATE TABLE IF NOT EXISTS Animator_Files (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Data BYTEA,
    ModifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
    console.log("Table created or already exists.");

    console.log("Inserting data...");
    await client.query(
      `
  INSERT INTO Animator_Files (Name, Data) 
  VALUES 
  ($1, $2),
  ($3, $4)
`,
      [
        "Example File",
        Buffer.from("Sample data in binary"),
        "Another File",
        Buffer.from("More sample data"),
      ]
    );
    console.log("Data inserted.");

    console.log("Querying data...");
    const result = await client.query("SELECT * FROM Animator_Files");
    console.log("Data retrieved:", result.rows);
  } catch (err) {
    console.log("Problem at /somepage ID: #001");

    res.status(500).send("Internal Server Error");
  } finally {
    // Ensure the client is properly closed
    await client.end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
