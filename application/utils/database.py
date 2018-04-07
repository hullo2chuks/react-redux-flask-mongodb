from mongokit import Connection

class DBConnect(Connection):
    '''DBConnect class subclass of mongokit Connection class. Used is updating/changing the
    database connection.
    '''

    def __init__(self, app=None, *args, **kwargs):
        self.db = None
        if app is not None:
            self.init_app(app)
        Connection.__init__(self, *args, **kwargs)

    def init_app(self, app):
        '''Initalizes the application with the extension.

        :param app: The Flask application object.
        '''
        self.db = self[app.config.get('DATABASE_NAME', 'test')]