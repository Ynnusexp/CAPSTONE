from app.models import Post, db
from faker import Faker
from datetime import datetime
from random import choice
import requests
from sqlalchemy.sql import text

fake = Faker()

def seed_posts():
    for _ in range(101):

        response = requests.get("https://picsum.photos/900/500")

        if response.status_code == 200:
            image_url = response.url
        else:
            image_url = "https://picsum.photos/500/600"

        post = Post(
            user_id=choice(range(1,11)),
            title=fake.sentence(),
            description=fake.paragraph(),
            image=image_url,
            date=datetime.now()
        )

        db.session.add(post)
        db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
