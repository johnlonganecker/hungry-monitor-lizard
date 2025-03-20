import base64

enc = base64.b64encode(open("tada.wav", "rb").read())

print(enc)
