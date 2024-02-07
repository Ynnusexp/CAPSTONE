from flask.cli import AppGroup
from .users import seed_users, undo_users

from app.models.db import db, environment, SCHEMA
from .post_seeders import seed_posts, undo_posts
from .comment_seeders import seed_comments, undo_comments

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

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

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_posts(titles, descriptions)
    seed_comments(comments)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_posts()
    undo_users()
    # Add other undo functions here
