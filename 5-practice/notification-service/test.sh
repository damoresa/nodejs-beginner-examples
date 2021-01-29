#/bin/bash

curl -X POST -H 'Content-Type: application/json' -d '{ "id": "1", "name": "John", "lastname": "Doe", "email": "john@gmail.com" }' http://localhost:3354/notification/
curl -X POST -H 'Content-Type: application/json' -d '{ "id": "1", "name": "John", "lastname": "Doe" }' http://localhost:3354/notification/
curl -X POST -H 'Content-Type: application/json' http://localhost:3354/notification/
