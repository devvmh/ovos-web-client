## ovos-web-client

Intended to be a replacement for mycroft-cli-client and ovos-cli-client but built for 

## Running in production

Not ready yet!

## Set up for development

First, set up your .env file to populate environment variables:

    cp example.env .env
    vim .env # edit the values

Next build the frontend Javascript code:

    Not ready yet!

Now in a separate terminal, start the Flask web server

    cd server
    source ../.env
    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt
    flask run

Now visit http://localhost:5000 to view the server.
