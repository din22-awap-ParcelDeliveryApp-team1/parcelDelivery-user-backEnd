import express, { Request, Response } from 'express';
import user from '../models/user_model';

const router = express.Router();

interface User {
  id_user: number;

  // Add other properties of the user if applicable
}
// the thunder client api test http 
// http://localhost:3001/user/check-username?user_name=akui

//check if user exists
//11-27 new code 
router.get('/check-username', async (req:Request, res:Response) => {
  console.log(req.body + "user_controller");
  
  const user_name = req.query.user_name;
  console.log(user_name);
  try{
    const ifUserExist = await user.checkifUserExists(user_name as string);
    
    if(ifUserExist){
      console.log("User exists: " + ifUserExist);
      return res.status(302).json({message: "This username already exists"});
    }
    
    res.json(200);
   
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}); 

//create user
router.post('/', async (req:Request, res:Response) => {
  console.log(req.body + "user_controller");
  
  const {user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city} = req.body;
  

  try{
    const newUser = await user.createUser(user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city);
    res.status(201).json({ message: 'User created successfully', newUser });
    console.log(newUser);
    }catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 
// Get user by id
router.get('/:userId', async (req:Request, res:Response) => {
  const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter

  try {
    const userData = await user.getUser(userId);

    if (userData.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
// delete user by id
router.delete('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter

  try {
    const userData = await user.deleteUser(userId);

    if (userData.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;