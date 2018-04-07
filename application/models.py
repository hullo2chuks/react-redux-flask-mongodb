import datetime
from mongokit import Document, Connection

from application import bcrypt
from cuid import cuid

class User(Document):
    __collection__ = 'users'
    __database__ = 'test'

    structure = {
        'email': str,
        'password': str,
        'cuid': str
    }

    required_fields = ['email', 'password', 'cuid']
    default_values = {'cuid':cuid()}
    use_dot_notation = True

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password,conn):
        user = conn.User.find_one({'email':email})
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


#conn = Connection()
#conn.register([User])
#user = conn.User()
