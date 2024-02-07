from app.models import Post, db, environment, SCHEMA
from faker import Faker
from datetime import datetime
from random import choice
import requests
from sqlalchemy.sql import text

# fake = Faker()

titles = [
    "The Art of Cooking",
    "Introduction to Python Programming",
    "History of Ancient Civilizations",
    "The Power of Positive Thinking",
    "Exploring Space: A Beginner's Guide",
    "The Joy of Painting",
    "Healthy Living: Tips and Tricks",
    "Mastering the Guitar",
    "Financial Freedom: A Practical Guide",
    "Mindfulness Meditation",
    "The Science of Happiness",
    "Artificial Intelligence: A Modern Approach",
    "World War II: A Comprehensive Overview",
    "Effective Communication Strategies",
    "The Secrets of Success",
    "Ecology and Environmental Sustainability",
    "The Magic of Music",
    "Entrepreneurship: From Idea to Success",
    "Healthy Eating Habits",
    "The Art of Public Speaking"
]
descriptions = [
    "Learn the art of cooking delicious meals from scratch.",
    "Discover the fundamentals of Python programming language.",
    "Explore the rise and fall of ancient civilizations.",
    "Harness the power of positive thinking to transform your life.",
    "Embark on a journey through the wonders of outer space.",
    "Unlock your creativity through the joy of painting.",
    "Explore practical tips for maintaining a healthy lifestyle.",
    "Master the guitar with comprehensive lessons and techniques.",
    "Gain financial independence with actionable strategies.",
    "Experience inner peace and tranquility through mindfulness meditation.",
    "Discover the science behind happiness and well-being.",
    "Explore the world of artificial intelligence and its applications.",
    "Learn about the events and impact of World War II.",
    "Improve your communication skills for greater success.",
    "Unlock the secrets to achieving your goals and dreams.",
    "Learn about ecology and strategies for environmental conservation.",
    "Discover the magic and transformative power of music.",
    "Explore the journey from idea conception to business success.",
    "Learn about the importance of healthy eating and nutrition.",
    "Develop confidence and effectiveness in public speaking."
]

#  picks= [
#     "The Art of Cooking" : "Learn the art of cooking delicious meals from scratch.",
#     "Introduction to Python Programming" : "Discover the fundamentals of Python programming language.",
#     "History of Ancient Civilizations" : "Explore the rise and fall of ancient civilizations.",
#     "The Power of Positive Thinking" : "Harness the power of positive thinking to transform your life.",
#     "Exploring Space: A Beginner's Guide" : "Embark on a journey through the wonders of outer space.",
#     "The Joy of Painting": "Unlock your creativity through the joy of painting.",
#     "Healthy Living: Tips and Tricks": "Explore practical tips for maintaining a healthy lifestyle.",
#     "Mastering the Guitar" : "Master the guitar with comprehensive lessons and techniques.",
#     "Financial Freedom": "A Practical Guide: Gain financial independence with actionable strategies.",
#     "Mindfulness Meditation": "Experience inner peace and tranquility through mindfulness meditation.",
#     "The Science of Happiness": "Discover the science behind happiness and well-being.",
#     "Artificial Intelligence": "A Modern Approach: Explore the world of artificial intelligence and its applications.",
#     "World War II" : "A Comprehensive Overview: Learn about the events and impact of World War II.",
#     "Effective Communication Strategies" : "Improve your communication skills for greater success.",
#     "The Secrets of Success" : "Unlock the secrets to achieving your goals and dreams.",
#     "Ecology and Environmental Sustainability" : "Learn about ecology and strategies for environmental conservation.",
#     "The Magic of Music" : "Discover the magic and transformative power of music.",
#     "Entrepreneurship" : "From Idea to Success: Explore the journey from idea conception to business success.",
#     "Healthy Eating Habits" : "Learn about the importance of healthy eating and nutrition.",
#     "The Art of Public Speaking" : "Develop confidence and effectiveness in public speaking."
# ]


def seed_posts(titles, descriptions): ##############
    for _ in range(20):

        response = requests.get("https://picsum.photos/900/500")

        if response.status_code == 200:
            image_url = response.url
        else:
            image_url = "https://picsum.photos/500/600"

        post = Post(
            user_id=choice(range(1,11)),
            title=titles[_],
            description=descriptions[_],
            image=image_url,
            # date=datetime.now()
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(post)
        db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
