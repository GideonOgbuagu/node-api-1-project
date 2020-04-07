const express = require('express');
const shortid = require('shortid');

const server = express();

// middleware 
server.use(express.json())
// POST	/api/users	Creates a user using the information sent inside the request body.
// GET	/api/users	Returns an array users.
// GET	/api/users/:id	Returns the user object with the specified id.
// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.
// PATCH	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

let users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
      
]

// endpoints
server.post('/api/users', (req, res) => {
    
    const userInfo = req.body;

    if(req.body.name === '' || req.body.bio === '') {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
    } else if(userInfo) {
        users.push(userInfo);
        res.status(201).json(users)
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
    
})

server.get('/api/users', (req, res) => {
    if(res.status !== 201 && res.status !== 400) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.param.id //the way we get whatever is entered in as id by the request(browser)
    const user = users.find(user => user.id == id)
    if(user){
        res.status(200).json(user)
    } else if(!user){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})
server.listen(5000, () => console.log(`Server running on port 5000`));