import customtkinter as ctk
import base64
import json
import requests

class Play(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Play")
        self.geometry("500x400")
        
        get_games = requests.get("http://localhost:3000/req_all")
        for games in get_games.json():
            ctk.CTkButton(self, text=games, command=lambda g=games: self.clicked(g)).pack(pady=5)
    
    def clicked(self, name):
        payload = {
            "name": name
        }
        code = requests.get("http://localhost:3000/req",
                        params=payload
                    )
        exec(base64.b64decode(json.loads(code.text)['code']))