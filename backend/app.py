# Hello and welcome to the backend app


from flask import Flask

app = Flask(__name__)

@app.route("/home", methods=["GET"])
def home():
  return "Welcome to the homepage"


if __name__=="__main__":
  app.run(debug=True)