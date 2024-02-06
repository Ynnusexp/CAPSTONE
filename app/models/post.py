from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):

    __tablename__ = "posts"

    if environment == "production":
            __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    image = db.Column(db.String(255))

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade = "all, delete-orphan")

    def to_dict(self):

        return {
            "id": self.id,
            "userId": self.user_id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "image": self.image,
            "comments": [comment.to_dict() for comment in self.comments],
            "user": self.user.username
        }
