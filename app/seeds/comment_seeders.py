from app.models import Comment, db, environment, SCHEMA
from faker import Faker
from datetime import datetime
from random import choice
from sqlalchemy.sql import text

# fake = Faker()
comments = [
    "Great post!",
    "Interesting topic.",
    "Well-written.",
    "Nice work.",
    "Thanks for sharing.",
    "Informative content.",
    "Fantastic!",
    "I learned something new.",
    "Impressive!",
    "Good job!",
    "Enjoyable read.",
    "Well done!",
    "Useful information.",
    "Looking forward to more.",
    "Helpful post.",
    "Appreciate your effort.",
    "Awesome!",
    "Enjoyed it.",
    "Valuable insights.",
    "Excellent post.",
    "Beneficial content.",
    "Thumbs up!",
    "Liked it.",
    "Good read.",
    "Appreciated.",
    "Keep it coming!",
    "Educational.",
    "Impressed!",
    "Good stuff.",
    "Nice read.",
    "Well articulated.",
    "Informative article.",
    "Thank you!",
    "Interesting read.",
    "Great content.",
    "Useful read.",
    "Very well written.",
    "Worth reading.",
    "Well presented.",
    "Great information."
]

def seed_comments(comments):#####################
    for _ in range(40):

        comment = Comment(
            user_id=choice(range(1,11)),
            post_id=choice(range(1,20)),
            description=choice(comments),
        )

        db.session.add(comment)
        db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
