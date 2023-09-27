import hashlib
from datetime import datetime

username = "tesprogrammer" + datetime.now().strftime("%d%m%Y%H%M%S")

date_today = datetime.now().strftime("%d-%m-%y")
password_string = "bisacoding-" + date_today
hashed_password = hashlib.md5(password_string.encode()).hexdigest()

print("Username:", username)
print("Password:", hashed_password)