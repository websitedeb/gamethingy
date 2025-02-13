from utils import Play, Upload
import customtkinter as ctk

class Main(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Main")
        self.geometry("600x400")
        
        # Create navbar frame
        navbar = ctk.CTkFrame(self, height=50)
        navbar.pack(side="top", fill="x")

        # Add buttons to the navbar
        play_button = ctk.CTkButton(navbar, text="Play", command=self.show_play)
        play_button.pack(side="left", padx=10, pady=10)
        
        upload_button = ctk.CTkButton(navbar, text="Upload", command=self.show_upload)
        upload_button.pack(side="left", padx=10, pady=10)

    def show_play(self):
        Play().mainloop()

    def show_upload(self):
        Upload().mainloop()

if __name__ == "__main__":
    Main().mainloop()