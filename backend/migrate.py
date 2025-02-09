# migrate.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import User
from app.models.group import Group
from app.models.task import Task
from app.models.user_group import UserGroup
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
        {"name": "admin"},
        {"name": "developer"},
        {"name": "designer"},
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


def migrate():
    """Run the migration steps sequentially."""
    drop_tables()
    create_tables()
    insert_users()
    insert_groups()
    create_user_groups()
    insert_tasks()


if __name__ == "__main__":
    migrate()
