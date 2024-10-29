from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost:3306/database_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # optional, to suppress warnings

db = SQLAlchemy(app)