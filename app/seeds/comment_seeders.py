from app.models import Comment, db, environment, SCHEMA
from faker import Faker
from datetime import datetime
from random import choice
from sqlalchemy.sql import text

fake = Faker()

def seed_comments():
    for _ in range(101):

        comment = Comments(
            user_id=choice(range(1,11)),
            description=fake.paragraph(),
            date=datetime.now()
        )

        db.session.add(comment)
        db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
