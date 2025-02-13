const express = require("express");
const { JDB, JDBFS } = require("@web_dev_guy/jdb-js")

const app = express();
let registry;

if (new JDBFS().ListJDBF().find(jdbf => jdbf == "registry.json")){
    registry = new JDB("registry");
}
else{
    new JDBFS().CreateJDBF("registry");
    registry = new JDB("registry");
}

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
    const { name, prog } = req.body

    const schema = {
        name: name,
        prog: prog
    }

    new JDBFS().CreateJDBF(`${name}`);
    const file = new JDB(`${name}`);

    file.writeData(`"name": "${name}", "code": "${prog}"`);
    res.json(JSON.stringify(schema));
    registry.addData(`${name}`, `${name}`);
    file.terminate();
});

app.get("/req", (req, res) => {
    const name = req.query.name;
    const file = new JDB(`${name}`);
    res.send(file.readData());
    file.terminate();
});

app.get("/req_all", (req, res) => {
    res.json(registry.readData());
});

app.listen(3000, () => {
    console.log("running");
});