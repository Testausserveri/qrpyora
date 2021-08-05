![image](https://user-images.githubusercontent.com/46541386/128353888-43fc2088-7e1b-48b0-abda-50d2bcffa56e.png)

# QR-pyörä [![Build](https://github.com/Testausserveri/qrpyora/actions/workflows/main.yml/badge.svg)](https://github.com/Testausserveri/qrpyora/actions/workflows/main.yml) [![Deploy](https://github.com/Testausserveri/qrpyora/actions/workflows/deploy.yml/badge.svg)](https://github.com/Testausserveri/qrpyora/actions/workflows/deploy.yml)

QR-pyörä is a Finnish nationwide street art piece, that has large QR-code signs on sides of a bicycle. Scanning a QR-code takes a passer-by to a photo submission page, and after that it is up to them to figure out what to do. [Read more about the project on its website (in Finnish) (qrpyora.fi)](https://qrpyora.fi)

This repository contains source code for QR-pyörä's background services and user interface.

---

## Getting Started

```bash
$ git clone https://github.com/Testausserveri/qrpyora
```

### Configuration

Copy `.example.env` to `.env`, and fill in the details. You'll mostly need just MySQL/MariaDB database credentials. The NOMINATIM_URL isn't really necessary for development, although some API methods such as adding location won't work without it.

### Running Development Environment

This project is based mainly on three components: 
- back-end (`backend/`)
- public front-end (`frontend/public/`)
- admin front-end (`frontend/admin/`)

You must have backend running, but it is optional to have front-end running. 

For instance, to develop front-end website, you'll want to have back-end and public front-end running simultaneously:

```bash
$ cd frontend/public/
$ npm install
$ npm start
```

```bash
$ cd backend/
$ npm install
$ npm start
```

## Running in Docker

Copy `.env` and `docker-compose.yml` to your machine (no need to copy source code), and configure `.env` accordingly. In the `docker-compose.yml`, you may also want to change the frontend's exposed port (default 8080), in case you are running multiple services on your machine.

Run the following to bring the services up:
```bash
$ docker-compose up
```
