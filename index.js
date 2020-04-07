const express = require('express');
const shortid = require('shortid');

const server = express();

// middleware 
server.use(express.json())


let users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      },
      {
        id: 2, // hint: use the shortid npm package to generate it
        name: "John Doe", // String, required
        bio: "I am John Doe",  // String, required
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
        if(users){
            res.status(200).json(users);
        } else {
            res.status(500).json({ errorMessage: "The users information could not be retrieved."
        })

        }
    
})

server.get('/api/users/:id', (req, res) => {
    // const { id } = req.param //the way we get whatever is entered in as id by the request(browser)
    const userItem = users.find(user => (req.params.id === user.id.toString()))
    console.log(userItem)
    if(userItem){
        res.status(200).json(userItem)
    } else if(!userItem){
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
    
   
})

// server.get('/api/users/:id', (req, res) => {
//     const user = (users.find(user => (req.params.id === user.id.toString())));
//     if (user) res.status(200).json(user);
//     else res.status(404).json({ errorMessage: `Could not find user with ID: ${req.params.id}`})
// })

server.listen(5000, () => console.log(`Server running on port 5000`));