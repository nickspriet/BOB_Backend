# Team7-AndroidBackend
Bob-like peer-to-peer carsharing

## Configuration

Copy `config/index.js.sample` to `config/index.js` and fill in the required keys.

## Contributing

You'll need node.js and npm.

```bash
git clone https://github.com/HowestServerSideScripting/Team7-AndroidBackend.git
cd Team7-AndroidBackend
npm install
npm install -g grunt-cli

# Development: Build less and watch for changes
grunt

# Production: Build less
grunt build

# Do the configuration part
cp config/index.js.sample config/index.js

# Run server
npm start
open http://localhost:3000/

# Run server and reload on changes
npm install -g nodemon
nodemon bin/www
open http://localhost:3000/

# Run on production
NODE_ENV=production npm start
```

## Before Commits

Run `grunt test`

## Deployment

On a fresh server:

```bash
# User config
apt-get install sudo
adduser bob
sudo visudo
## Add privileges for bob
## Add SSH keys if you want
## Then exit SSH and log in as bob

# Install packages
sudo apt-get install vim zsh nginx git

# Set up zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"


# Installing MongoDB (on Ubuntu x64)
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update
apt-get install -y mongodb-org


# Download Node Version Manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

# Activate NVM
# (You can add the below line to your .bashrc or .zshrc)
source ~/.nvm/nvm.sh

# Install the last version of node
nvm install stable
nvm alias default stable

# Create folder
sudo mkdir /srv
sudo chown bob:bob /srv

# Clone the repository
## Good idea to add SSH keys to the git repo as well
git clone https://github.com/HowestServerSideScripting/Team7-AndroidBackend.git bob

# Set up the backend
cd bob
npm install --loglevel info

# Building
npm install -g grunt-cli
grunt build

# Configuration
cd config
cp index.js.sample index.js
# edit index.js
cd ..


# Running in production
npm install -g pm2
NODE_ENV=production pm2 start bin/www --name "bob"

# Restarting on boot (non-root)
sudo su -c "env PATH=$PATH:/home/bob/.nvm/versions/node/v4.2.1/bin pm2 startup linux -u bob"
pm2 save
sudo vim /etc/init.d/pm2-init.sh
# Replace PM2_HOME="/root/.pm2" with PM2_HOME="/home/bob/.pm2"
# Make sure your NVM version is correct

# Setting up Nginx
mkdir -p /srv/logs/bob
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /srv/bob/config/nginx.conf /etc/nginx/sites-enabled/bob
sudo nginx -s reload

# Monitoring
## The app
pm2 list
pm2 logs
pm2 monit

## The server
sudo apt-get install htop
htop
```

## Deploying new version

Connect to the server and run the following commands

```bash

cd /srv/bob
git pull
npm install --loglevel info
grunt build
pm2 restart bob
```
