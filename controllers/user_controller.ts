import express, { Request, Response } from 'express';
import user from '../models/user_model';

const router = express.Router();

interface User {
  id_user: number;
  // Add other properties of the user if applicable
}

// Get user by id
router.get('/:userId', async (req, res) => {
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