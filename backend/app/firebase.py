# app/firebase.py

import firebase_admin
from firebase_admin import credentials
import os
import json
from dotenv import load_dotenv

load_dotenv()

firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")

if not firebase_credentials:
    raise ValueError("No FIREBASE_CREDENTIALS environment variable found")

cred = credentials.Certificate(json.loads(firebase_credentials))
firebase_admin.initialize_app(cred)
