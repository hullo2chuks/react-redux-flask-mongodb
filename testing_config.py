from flask_testing import TestCase
from application import db
from application.models import User
import os
from basedir import basedir
import json

from config import app_config


class BaseTestConfig(TestCase):
    default_user = {
        "email": "default@gmail.com",
        "password": "something2"
    }

    def create_app(self):
        app.config.from_object(app_config['testing'])
        return app

    def setUp(self):
        self.app = self.create_app().test_client()
        db.create_all()
        res = self.app.post(
                "/api/create_user",
                data=json.dumps(self.default_user),
                content_type='application/json'
        )

        self.token = json.loads(res.data.decode("utf-8"))["token"]

    def tearDown(self):
        db.session.remove()
        db.drop_all()

