# migrate.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import User
from app.models.group import Group
from app.models.task import Task
from app.models.user_group import UserGroup
from app.models.static_task import StaticTask
from app.models.reward import Reward
from app.database import Base

# Replace with your actual database URL
DATABASE_URL = "postgresql://myuser:password@localhost/postgres"

# Create a synchronous engine
engine = create_engine(DATABASE_URL, echo=True)

# Create a configured "Session" class
Session = sessionmaker(bind=engine)


def create_tables():
    """Create tables in the database."""
    Base.metadata.create_all(engine)


def drop_tables():
    """Drop tables in the database."""
    Base.metadata.drop_all(engine)


def insert_users():
    """Insert dummy users into the database."""
    users_data = [
        {"user_name": "alice", "email": "alice@example.com"},
        {"user_name": "bob", "email": "bob@example.com"},
        {"user_name": "charlie", "email": "charlie@example.com"},
    ]
    with Session() as session:
        users = [User(**user_data) for user_data in users_data]
        session.add_all(users)
        session.commit()


def insert_groups():
    """Insert dummy groups into the database."""
    groups_data = [
        {"name": "admin", "invite_code": "admin"},
        {
            "name": "developer",
            "invite_code": "developer",
        },
        {"name": "designer", "invite_code": "designer"},
    ]
    with Session() as session:
        groups = [Group(**group_data) for group_data in groups_data]
        session.add_all(groups)
        session.commit()


def create_user_groups():
    """Create associations between users and groups."""
    with Session() as session:
        # Retrieve users and groups
        users = session.query(User).all()
        groups = session.query(Group).all()

        # Ensure that both users and groups are populated
        if not users or not groups:
            raise ValueError("Users or groups are empty. Migration cannot proceed.")

        # Create associations (example: first user with first group)
        user_groups = [
            UserGroup(user_id=users[0].id, group_id=groups[0].id),
            UserGroup(user_id=users[1].id, group_id=groups[1].id),
            UserGroup(user_id=users[2].id, group_id=groups[2].id),
        ]
        session.add_all(user_groups)
        session.commit()


def insert_tasks():
    """Insert dummy tasks into the database."""
    tasks_data = [
        {"title": "Task 1", "description": "Description for Task 1", "assigned_to": 1},
        {"title": "Task 2", "description": "Description for Task 2", "assigned_to": 2},
        {"title": "Task 3", "description": "Description for Task 3", "assigned_to": 3},
    ]
    with Session() as session:
        tasks = [Task(**task_data) for task_data in tasks_data]
        session.add_all(tasks)
        session.commit()


def insert_static_tasks():
    """Insert predefined static tasks into the static_tasks table."""
    static_tasks_data = [
        # Physical Activity Tasks
        {
            "title": "Walk 5,000+ Steps",
            "description": "Verified via phone pedometer or smartwatch.",
            "category": "Physical Activity",
        },
        {
            "title": "Do a 2-Minute Plank",
            "description": "Use the phone's front camera to detect movement or upload a time-stamped video.",
            "category": "Physical Activity",
        },
        {
            "title": "Complete a 15-Minute Workout",
            "description": "Verified via smartwatch.",
            "category": "Physical Activity",
        },
        {
            "title": "Do 10 Flights of Stairs",
            "description": "Step count + elevation gain on fitness trackers.",
            "category": "Physical Activity",
        },
        {
            "title": "Dance to 3 Songs in a Row",
            "description": "Use accelerometer data + music app confirmation.",
            "category": "Physical Activity",
        },
        {
            "title": "Hold a Yoga Pose for 1 Minute",
            "description": "AI-powered pose detection via the camera.",
            "category": "Physical Activity",
        },
        # Mental Wellness Tasks
        {
            "title": "Say 5 Positive Affirmations",
            "description": "Submit a voice note.",
            "category": "Mental Wellness",
        },
        {
            "title": "Call or Video Chat a Friend for 5 Minutes",
            "description": "Ability to call friends through app.",
            "category": "Mental Wellness",
        },
        {
            "title": "Try a New Deep Breathing Exercise",
            "description": "Record a guided breathing session from a supported app or use in-app capability.",
            "category": "Mental Wellness",
        },
        # Lifestyle Tasks
        {
            "title": "Limit Social Media to 30 Minutes Today",
            "description": "Sync with screen time data.",
            "category": "Lifestyle",
        },
        {
            "title": "Sleep 7+ Hours",
            "description": "Verified via wearable sleep tracker or phone screen-off time.",
            "category": "Lifestyle",
        },
        {
            "title": "Draw/Paint something based on daily prompt",
            "description": "",
            "category": "Lifestyle",
        },
        {
            "title": "Visit a local park/garden",
            "description": "",
            "category": "Lifestyle",
        },
        # Movement-Based Tasks
        {
            "title": "Meet in the Middle",
            "description": "App finds the midpoint between group members (e.g., a park or café) for a meetup.",
            "category": "Movement-Based",
        },
        {
            "title": "Step It Up",
            "description": "Each member must walk a minimum distance tracked via location updates. Group succeeds if everyone reaches the goal.",
            "category": "Movement-Based",
        },
        {
            "title": "Roaming Relay",
            "description": "Each member is assigned a checkpoint; visit the spot and take a picture to complete the challenge.",
            "category": "Movement-Based",
        },
        # Location-Based Exploration Tasks
        {
            "title": "Scavenger Hunt",
            "description": "Clues lead to landmarks or hidden locations. Tasks involve a selfie or scanning a QR code.",
            "category": "Location-Based",
        },
        {
            "title": "Find a New Spot",
            "description": "Visit a new place (e.g., café, bookstore, or park) and share what you love about it.",
            "category": "Location-Based",
        },
        {
            "title": "Photo Walk",
            "description": "Walk to a scenic spot and take a creative photo.",
            "category": "Location-Based",
        },
    ]
    with Session() as session:
        static_tasks = [StaticTask(**task_data) for task_data in static_tasks_data]
        session.add_all(static_tasks)
        session.commit()


def insert_rewards():
    """Insert predefined rewards into the database."""
    rewards_data = [
        {
            "name": "Amazon Gift Card",
            "value": 25.00,
            "description": "A $25 gift card for Amazon purchases.",
        },
        {
            "name": "Coffee Shop Voucher",
            "value": 10.00,
            "description": "A $10 voucher for your favorite coffee shop.",
        },
        {
            "name": "Fitness Tracker",
            "value": 50.00,
            "description": "A wearable device to monitor your fitness activities.",
        },
        {
            "name": "Yoga Class Pass",
            "value": 15.00,
            "description": "A pass for a single yoga class at a local studio.",
        },
        {
            "name": "Healthy Meal Kit",
            "value": 30.00,
            "description": "A kit with ingredients for a nutritious meal.",
        },
        {
            "name": "Spa Treatment Voucher",
            "value": 60.00,
            "description": "A voucher for a relaxing spa treatment.",
        },
        {
            "name": "Bookstore Gift Card",
            "value": 20.00,
            "description": "A $20 gift card for your favorite bookstore.",
        },
        {
            "name": "Music Streaming Subscription",
            "value": 9.99,
            "description": "One-month subscription to a music streaming service.",
        },
        {
            "name": "Online Course Access",
            "value": 40.00,
            "description": "Access to an online course of your choice.",
        },
        {
            "name": "Meditation App Subscription",
            "value": 12.00,
            "description": "One-month subscription to a meditation app.",
        },
        {
            "name": "Gym Membership",
            "value": 50.00,
            "description": "A one-month membership to a local gym.",
        },
        {
            "name": "Public Transportation Pass",
            "value": 25.00,
            "description": "A pass for public transportation in your city.",
        },
        {
            "name": "In-Office Massage",
            "value": 45.00,
            "description": "A voucher for a 30-minute in-office massage.",
        },
        {
            "name": "Childcare Voucher",
            "value": 100.00,
            "description": "A voucher to assist with childcare expenses.",
        },
        {
            "name": "Employee Discount",
            "value": 20.00,
            "description": "A discount on company products or services.",
        },
        {
            "name": "Paid Time Off on Birthday",
            "value": 0.00,
            "description": "Enjoy a paid day off on your birthday.",
        },
        {
            "name": "Event Tickets",
            "value": 75.00,
            "description": "Tickets to a concert, sports game, or theater show.",
        },
        {
            "name": "Staycation Package",
            "value": 150.00,
            "description": "A package for a local getaway.",
        },
        {
            "name": "Streaming Service Subscription",
            "value": 15.00,
            "description": "One-month subscription to a video streaming service.",
        },
        {
            "name": "Home Office Upgrade",
            "value": 100.00,
            "description": "Funds to enhance your home office setup.",
        },
    ]
    with Session() as session:
        rewards = [Reward(**reward_data) for reward_data in rewards_data]
        session.add_all(rewards)
        session.commit()


def migrate():
    """Run the migration steps sequentially."""
    drop_tables()
    create_tables()
    insert_users()
    insert_groups()
    create_user_groups()
    insert_tasks()
    insert_static_tasks()
    insert_rewards()


if __name__ == "__main__":
    migrate()
