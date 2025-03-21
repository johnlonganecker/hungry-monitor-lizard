import base64

enc = base64.b64encode(open("shutdown.wav", "rb").read())

print(enc)
