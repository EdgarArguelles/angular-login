# API

## Ping [/ping]
### Ping [POST]

+ Request (application/json)

    + Body

            {
                "token": "valid"
            }

+ Response 200 (application/json)

    + Body

            {
                "token": "valid"
            }

+ Request (application/json)

    + Attributes (object)
        + token (string)

+ Response 500 (application/json)

    + Body

            {
                "errors": [
                    {
                      "id": "Authentication failed",
                      "message": "Credentials provided are incorrect."
                    }
                ]
            }


## Login [/login]
### Login [POST]

+ Request (application/json)

    + Body

            {
                "username": "user",
                "password": "123"
            }

+ Response 200 (application/json)

    + Body

            {
                "token": "valid"
            }

+ Request (application/json)

    + Attributes (object)
        + username (string)
        + password (string)

+ Response 401 (application/json)

    + Body

            {
                "errors": [
                    {
                      "id": "Authentication failed",
                      "message": "Credentials provided are incorrect."
                    }
                ]
            }


## Logout [/logout]
### Logout [POST]

+ Request (application/json)

    + Attributes (object)
        + token (string)

+ Response 200 (application/json)

    + Body

            {
                 "id": "Logout Success",
                 "message": "Logout Success."
            }
