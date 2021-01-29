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
