# Expense-CRUD-with-react-redux-exprsess-mongodb
Expense Backend Node.js, Express, MongoDB &amp; Frontend React-Redux Project
 
# Start backend Service first (expense-backend)
	(1) Open terminal and navigate to Project folder.
	(2) For first time run "npm install" on your terminal
	(3) Wait for all dependency to be installed
	(4) Enter "npm start" on your terminal to run the service
	(5) This backend service will run on http://localhost:3001/

# Start Frontend UI Project (expense-react-client)	
	(1) Open terminal and navigate to Project folder.
	(2) For first time run "yarn" on your terminal
	(3) Wait for all dependency to be installed
	(4) Enter "npm start" on your terminal to run the service
	(5) Application will open on "http://localhost:3000", with your default browser
	
# Following Api & font-end react routes implemented:
	Backend routes:
	(1) Default route (/) is for displaying list of routes present in the project
	(2) Other routes are:
		(a) GET + POST /expense
		(b) GET /expense/category/{id}
		(c) GET /expense/payment/{mode}
		(d) GET /expense/date/{expenseDate}
		(e) GET + PUT + DELETE /expense/billref/{billRef}
						
	Frontend routes:	
	(1) Default route (/) is expense entry page
	(2) Display list expenses - route is /list
	(c) Expense update route is /update/{billRef}
	
# Tools and library used in project	
	For Backend service:
		(a) Node.js, 
		(b) Express.js
		(c) EJS
		(d) MongoDB, Mongoose
		(e) Body-parser
		(f) Cors
	
	For Frontend app:
		(a) React,
		(b) Redux, Redux-thunk
		(c) Kendo Grid
		(d) React router
		(e) Axios
	
	
	