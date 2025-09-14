import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const LUMEN_API = process.env.LUMEN_API || 'http://localhost:8000/api';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const lumenRes = await axios.post(`${LUMEN_API}/login`, req.body);
    res.status(200).json(lumenRes.data); // should include JWT token
  } catch (err: any) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.errors || 'Login failed';
    res.status(status).json({ error: message });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Register request body: ", req.body);
    const lumenRes = await axios.post(`${LUMEN_API}/register`, req.body);
    res.status(201).json(lumenRes.data); // user created
  } catch (err: any) {
    console.log("error in regisration: ", err);
    const status = err.response?.status || 500;
    const message = err.response?.data?.errors || 'Registration failed';
    res.status(status).json({ error: message });
  }
};