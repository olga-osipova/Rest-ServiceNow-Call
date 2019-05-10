# Rest-ServiceNow-Call
Calling User table from a ServiceNow developer instance by localhost AngularJS SPA and performing DB operations

1. Create a CORS rule in your ServiceNow Developer instance ('sys_cors_rule' table):
Name: localhost
Application: Global
REST API: Table API
Domain: HTTP://localhost:8080
HTTP Methods: GET, POST, PUT, PATCH, DELETE

2. Launch NodeJS script in a Node command line, then open http://localhost:8080/.

3. Enjoy the SPA.
