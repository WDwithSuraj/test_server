const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());


app.get("/", (_, res) => {
    return res.status(200).json({
        message: "Welcome!, Server is up and running."
    });
})

app.get("/user", (req, res) => {
    const filePath = path.join(__dirname, "user_data.json");
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read user data" });
        }
        try {
            const userData = JSON.parse(data);
            return res.status(200).json(userData);
        } catch (parseError) {
            return res.status(500).json({ error: "Failed to parse user data" });
        }
    });
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});