# Filmfeed server

The filmfeed server was purposefully designed, planned, and built specifically for the app. ERD was used in the database architecture to ensure that the app could manage the interaction of data between the app’s api and database as well as a third party api. This server was built with RESTful API, postgreSQL, and express.

This required careful planning to minimise multiple requests made to both of the api’s, and ensure data was stored on the database efficiently for each user. Whilst also minimising the amount of data stored to lower costs as much as possible, that was done by only storing key information where necessary.

Each user's password has been encrypted through hashing for security, additionally ensuring that at no point the user's hashed password is returned in any response from the api.

<p align="center">
  <img src="https://seekvectors.com/files/download/node%20js%20logo.png" alt="Node.js" width="90"/>
  <img src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" alt="Express.js" width="70"/>
  <img src="https://vadosware.io/images/postgres-logo.png" alt="PostgreSQL" width="80"/>
</p>
