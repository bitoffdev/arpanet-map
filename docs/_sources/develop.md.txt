# Development Guide

## Building the Static Website

This guide will walk you through building this application as a directory of
static files to serve from a web server like Nginx, Apache, or via GitHub
Pages.

### Requirements

You will need the following installed before continuing.

- node.js 12.x
- yarn
- Docker

Additionally, if you want to build the documentation, you will need:

- Python 3.x and pip

### Start MySQL with Data

Run the following commands in a shell from the root directory of this repo.

Start mysql in a container populated with the Arpanet data.

```bash
docker run \
  --rm -it -p 3306:3306 \
  --mount "type=bind,src=$PWD/arpanet.sql,dst=/docker-entrypoint-initdb.d/arpanet.sql" \
  --env MYSQL_ROOT_PASSWORD=password \
  --env MYSQL_DATABASE=arpanet \
  mysql
```

### Install Packages from NPM

Install the node.js dependencies via yarn:

```bash
yarn install
```

### Build JavaScript App

```bash
yarn build
```

### Build static GeoJSON files.

Build the GeoJSON files using the data we previously loaded into MySQL

```bash
yarn buildMaps --dest build
```

### [Optional] Build Documentation

First, install the required python packages.

```bash
python3 -m pip install --user -r build-support/requirements.txt
```

Now, build the documentation HTML.

```bash
sphinx-build -b html docs build/docs
```


### Serve

You should now have the entire app build as a set of static files in the `build` directory.

You can serve these static files locally with the following command:

```bash
npx http-server ./build
```

Now, visit [localhost:8080](http://localhost:8080) in your browser!
