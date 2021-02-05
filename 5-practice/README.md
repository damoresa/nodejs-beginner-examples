#### Purposed exercise: COVID tracker

Using _NodeJS_ and _express.js_, implement a system that tracks
interactions between registered users and notifies users that 
have interacted with each other in case one of them reports to 
have been infected vi _COVID-19_.

#### Exercise scope

The scope of the exercise __is not the fully fledged__ implementation
of the system. Instead, the data stores can be manually populated in 
memory and the interactions can be manually fed into the system.

The idea of this exercise is to be able to practice service implementation,
together with user authentication & authorization and multiple services 
orchestration in _NodeJS_ leveraging flow controls.

All the services must make use of the _Auth service_ to ensure the user 
executing the flow has access to perform the requested operations - this 
also means the _Authorization_ header must be propagated thru the services.

All services must also validate their input, generating _Bad Request_ errors 
in case the received payload is not correct.

#### Component map

The solution component map is as follows:
- _Auth service_: handles authentication and access validation 
by providing signed JWTs. It's user database is different from 
the persons service as this service contains users which can 
access the application, while the persons service stores anyone
who agrees to have his interactions tracked.
- _Persons service_: handles persons data - name, lastname and 
email.
- _Interactions service_: handles persons interactions, registering 
notified interactions between known users. After a set amount of time,
interactions are marked as "_safe_" to ensure notifications are 
relevant.
- _Notification service_: handles notifications to persons, in 
this case via email.
- _COVID tracker_: handles _COVID_ infection reports, allocating 
reporter and it's interactions data to notify affected persons.

![Architecture diagram](Exercise.png)

###### Auth-service

```yaml
/login/:
    get:
      description: |
        Extracts the JWT token from the 'authorization' header
        and validates it's well formed, returning its internal
        user data in case it is valid or an access error if no
        token or invalid token is provided.
      responses:
        200:
          schema:
            type: object
            properties:
              username:
                type: string
    post:
      description: |
        Generates an authorization JWT token using the given
        username and password user data. If the user does not 
        exist, it generates a response error.
      responses:
        200:
          schema:
            type: object
            properties:
              token:
                type: string
```

###### Persons service

The purposed person data object is as follows:

```json
[
  {
    "id": "1",
    "name": "John",
    "lastname": "Doe",
    "email": "john@gmail.com"
  },
  {
    "id": "2",
    "username": "Bob",
    "lastname": "Eod",
    "email": "bob@gmail.com"
  },
  {
    "id": "3",
    "username": "Jane",
    "lastname": "Doe",
    "email": "jane@gmail.com"
  }
]
```

This service should expose the following endpoints:

```yaml
get:
  /persons/:
    description: Allocate all persons tracked by the system
  /persons/{personId}:
    description: Allocate the given person data
```

###### Interactions service

The purposed interactions data object is as follows:

```json
[
 {
   "persons": ["1", "2"],
   "date": "01/01/2021"
 }
]
```

This service should expose the following endpoints:

```yaml
get:
  /interactions/:
    description: Allocate all registered person interactions
  /interactions/person/{personId}:
    description: Allocate interactions which involve the given person
post:
  /interactions/:
    description: Register a new interaction between persons.
```

In order to add new interactions to the service, the following DTO is purposed:

```json
{
  "persons": ["2", "1"]
}
```

Date will be added as current date in _ISO format_ by the _express_ controller.

###### Notifications service

This service stores no data and should only generate request responses after validating
input data. It should expose the following endpoints:

```yaml
post:
  /notification/:
    description: Register a new interaction between persons.
```

The expected DTO is a standard user object, as follows:

```json
{
  "id": "1",
  "name": "John",
  "lastname": "Doe",
  "email": "john@gmail.com"
}
```

In case the _email_ attribute is missing, a 400 error should be generated.

###### Covid tracker

The main orchestrator service, when it is invoked, it'll use the infected people data 
to allocate its interactions and notify the involved persons.
The flow is as follows:

1. Validate that the request provides a valid JWT token.  
__tip__: use the _auth service_ validation endpoint for this.  
   1. If an invalid or no token is provided, generate a _forbidden_ error response.
1. Allocate the infected persons interactions by invoking the _interactions service_.
   1. If the _interaction service_ fails unexpectedly, abort flow with an unexpected 
   server error.
   1. If there is no known interactions for the user, generate a _not found_ response.
1. Using the interactions data, allocate the specific persons data by invoking the 
_persons service_.
   1. If the _persons service_ fails unexpectedly, abort flow with an unexpected 
   server error.
   1. We assume that interactions always inform correct user data - there won't be cases 
   in which there's an interaction for an unknown/non-existant user.
1. Using the persons data, generate notifications by invoking the _notification service_.
   1. If the _notifications service_ fails unexpectedly, abort flow with an unexpected 
   server error.
   
The endpoint exposed by this service is as follows:

```yaml
post:
  /tracking/:
    description: Endpoint new infections are reported to
```

And the expected data format is as follows:

```json
{
  "personId": "1"
}
```

Remember requests made to this service must provide a valid JWT token, previously generated 
at _auth service_, on the _authorizations_ header. For example:

```json
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9obiIsInBhc3MiOiIxMjM0NTYifSwiaWF0IjoxNjExOTA5MzMyLCJleHAiOjE2MTE5MTExMzJ9.HGWcnRIAXrvhgC1Zz2S6DKkf2mjDxhu-iQEec1WZBY8"
}
```
