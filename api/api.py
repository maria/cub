from flask import Flask, json, request, session, redirect, make_response
from flask_mongoengine import MongoEngine
from flask_restful import Api

db = MongoEngine()
app = Flask(__name__)
app.config.from_pyfile('config.py')
print app.config
db.init_app(app)
api = Api(app)


@app.route('/authorize')
def authorize():
    pass


@app.route('/authenticate')
def authenticate():
    pass


@app.route('/logout', methods=['DELETE'])
def logout():
    if 'username' in session:
        session.pop('username', None)
    return redirect('/')


if __name__ == '__main__':
    app.run(host=app.config['HOST'])
