# React-Redux-Flask with MongoDB #

Starter application for a Flask JWT Backend with Mongodb and a React/Redux Front-End with Material UI.

This repo project is based on [React-Redux-Flask](https://howchoo.com/g/mze4ntbknjk/install-pip-on-mac-os-x) with some frontend upgraded libraries.

* Python 3.6
* Pytest
* Flask
* React
* Redux
* React-Router
* React-Router-Redux
* Babel
* SCSS processing
* Webpack

To update database after creating new migrations, use:

```sh
$ python manage.py db upgrade
```

### Install Front-End Requirements
```sh
$ cd static
$ npm install
```

### Run Back-End

```sh
$ python manage.py runserver
```

### Test Back-End

```sh
$ python test.py --cov-report=term --cov-report=html --cov=application/ tests/
```

### Run Front-End

```sh
$ cd static
$ npm start
```

### Build Front-End

```sh
$ npm run build:production
```

### New to Python?

If you are approaching this demo as primarily a frontend dev with limited or no python experience, you may need to install a few things that a seasoned python dev would already have installed.

Most Macs already have python 2.7 installed but you may not have pip install. You can check to see if you have them installed:

```
$ python --version
$ pip --version 
```

If pip is not installed, you can follow this simple article to [get both homebrew and python](https://howchoo.com/g/mze4ntbknjk/install-pip-on-mac-os-x)

After you install python, you can optionally also install python 3

```
$ brew install python3
```

Now you can check again to see if both python and pip are installed. Once pip is installed, you can download the required flask modules:

```
$ pip install -r requirements.txt
```

Now, you you must make sure that mongodb database is up and running


4. Run Back-End

```
$ python manage.py runserver
```

If all goes well, you should see ```* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)``` followed by a few more lines in the terminal.

5. open a new tab to the same directory and run the front end

```
$ cd static
$ npm install
$ npm start
```

6. open your browser to http://localhost:3000/register and setup your first account
7. enjoy! By this point, you should be able to create an account and login without errors. 




