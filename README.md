# intsureview-fullstack-project

Form application: 

Front-end requirements:
**Page Layout**
1. Create a header component with the name of a fake company of your choice (company FormApp and user initials)
2. Create a central content component that will hold all of the form components (form)
3. Create a footer containing something you'd expect to find in the footer (FormApp + links from Sure)

**Form Content**
1. Create a text input (first/last name)
2. Create a select input that handles the values `Yes` and `No` (confirmation)
3. Create 3 more inputs of your choice, they do not need to be unique (more annoying confirmations + color selection)
4. Validate the content of at least one input (make sure all the confirmations are true in order to submit)

**Functionality**
1. Create a submit button that, when clicked, sends your form data to the backend.
2. Handle the backend response on the frontend however you see fit (person information saved in backend. Success text is displayed in person's color when added/changed/deleted)


Back-end requirements:
1. There should be at least one endpoint on the backend for the FE to hit with its form data (/, /submit/, /delete/<firstname>/<lastname>/)
2. There should be distinct responses for success/failure of the endpoint call (200/404/400)
3. There should be a restricted set of HTTP request methods the endpoint allows (GET, PUT, POST, etc.) (/-get, submit-put, delete-delete)
