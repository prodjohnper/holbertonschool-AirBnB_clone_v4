#!/usr/bin/python3
'''
	  2-hbnb.py

    Starts a Flask web application
'''
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
from uuid import uuid4
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    '''
        Method to close the database session
    '''
    storage.close()


@app.route('/2-hbnb/', strict_slashes=False)
def hbnb():
    '''
        Method to render the HBNB HTML page
    '''
    states = storage.all(State).values()  # Get all states
    states = sorted(states, key=lambda k: k.name)  # Sort by name
    statesCitiesList = []  # List to store states and cities

    # Loop through states and sort cities by name
    for state in states:
        statesCitiesList.append(
            [state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()  # Get all amenities
    amenities = sorted(amenities, key=lambda k: k.name)  # Sort by name

    places = storage.all(Place).values()  # Get all places
    places = sorted(places, key=lambda k: k.name)  # Sort by name

    # Return the HBNB HTML page
    return render_template('2-hbnb.html',
                           states=statesCitiesList,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid4())


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
