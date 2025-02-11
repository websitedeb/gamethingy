const express = require("express");
const { JDB, JDBFS } = require("@web_dev_guy/jdb-js")

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
    console.log(req.body)
    const { name, creator, desc, prog } = req.body
    const date = new Date().toISOString().split("T")[0];

    const schema = {
        name: name,
        creator: creator,
        date: date,
        desc: desc,
        prog: prog
    }

    console.log(schema)

    const file = new JDB(`${name}`);

    const newp = prog.replaceAll("\"", "\'")

    file.writeData(`"name": "${name}", "creator": "${creator}", "date" : "${date}", "desc": "${desc}", "code": "${newp}"`);
    res.json(JSON.stringify(schema));
    file.terminate();
});

app.get("/req", (req, res) => {
    const name = req.get("name");

    const file = new JDB("finder");
    const finder = new JDBFS();

    finder.IntegrateJDBF(name, "finder");
    res.send(file.readData());
    file.terminate();
    finder.DestroyJDBF("finder");
});

app.listen(3000, () => {
    console.log("running");
});