import express, { Request, Response } from 'express';
import user from '../models/user_model';

const router = express.Router();

interface User {
  id_user: number;
}

//check if user exists
router.get('/check-username', async (req:Request, res:Response) => {  
  const user_name = req.query.user_name;
  
  try{
    const ifUserExist = await user.checkifUserExists(user_name as string);
    
    if(ifUserExist){
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
  const {user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city} = req.body;
  
  try{
    const newUser = await user.createUser(user_name, password, first_name, last_name, telephone, email, street_address, postal_code, city);
    res.status(201).json({ message: 'User created successfully', newUser });
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
  const userId = parseInt(req.params.userId, 10); 

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