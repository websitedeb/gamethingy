import axios from "axios";
import fetch from "node-fetch";

const py = String.raw`
from ursina import *
app = Ursina()
cube = Entity(model='cube', color=hsv(300,1,1), scale=2, collider='box')
def spin():
    cube.animate('rotation_y', cube.rotation_y+360, duration=2, curve=curve.in_out_expo)
cube.on_click = spin
EditorCamera()  # add camera controls for orbiting and moving the camera
app.run()
`

fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: "obby",
        creator: "sarthak ghoshal",
        desc: "cool obby i made",
        prog: py
    })
})
.then(res => res.text())
.then(data => console.log(data))
.catch(err => console.error(err));


const config2 = {
    headers: {
        "name": "obby"
    }
};
    
axios.get("http://localhost:3000/req", config2)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));