## ovos-web-client

Intended to be a replacement for mycroft-cli-client and ovos-cli-client but built for 

## Security note

If you run this server, it will open up your message bus to the internet. If you don't have a firewall, this is yet another security risk that can allow attackers to send arbitrary commands to your Mycroft. Use at your own risk, or comment out the submit_input function!

## Running in production

Not ready yet!

## Set up for development

First, set up your .env file to populate environment variables:

    cp example.env .env
    vim .env # edit the values
    source .env

Next build the frontend Javascript code:

    cd client
    npm install
    npm run build

Now build the Flask web server

    cd ../server
    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.txt

Now run the server with `flask run` and visit http://localhost:5000 to view the server.
