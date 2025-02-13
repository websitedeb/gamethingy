import customtkinter as ctk
import base64
import json
import requests

class Upload(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Upload")
        self.geometry("500x680")
        
        ctk.CTkLabel(self, text="Name:").pack(pady=5)
        self.name_entry = ctk.CTkEntry(self)
        self.name_entry.pack(pady=5)
        
        ctk.CTkLabel(self, text="Code:").pack(pady=5)
        self.code_text = ctk.CTkTextbox(self, height=500, width=500)
        self.code_text.pack(pady=5)
        
        self.submit_btn = ctk.CTkButton(self, text="Submit", command=self.submit_form)
        self.submit_btn.pack(pady=10)
    
    def submit_form(self):
        name = self.name_entry.get()
        prog = self.code_text.get("1.0", "end").strip()
        
        encoded_prog = base64.b64encode(prog.encode()).decode()
        
        payload = {
            "name": name,
            "prog": encoded_prog
        }
        
        response = requests.post("http://localhost:3000/register", 
                                 headers={"Content-Type": "application/json"},
                                 data=json.dumps(payload))
        
        if response.status_code == 200:
            print("Upload successful!")
        else:
            print("Upload failed:", response.text)