from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    game_sessions = db.relationship('GameSession', backref='user', lazy=True)
    stats = db.relationship('UserStats', backref='user', uselist=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class GameSession(db.Model):
    __tablename__ = 'game_sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    word = db.Column(db.String(5), nullable=False)
    time_taken = db.Column(db.Integer, nullable=False)  # seconds
    guesses_count = db.Column(db.Integer, nullable=False)
    won = db.Column(db.Boolean, nullable=False)
    date_played = db.Column(db.Date, default=datetime.utcnow().date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserStats(db.Model):
    __tablename__ = 'user_stats'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    total_games = db.Column(db.Integer, default=0)
    games_won = db.Column(db.Integer, default=0)
    games_lost = db.Column(db.Integer, default=0)
    best_time = db.Column(db.Integer, nullable=True)  # seconds
    best_guesses = db.Column(db.Integer, nullable=True)
    best_word = db.Column(db.String(5), nullable=True)
    best_game_date = db.Column(db.Date, nullable=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
