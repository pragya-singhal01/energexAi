import express from 'express';
import redis from '../services/redisClient.ts';
import axios from 'axios';

const LUMEN_API = process.env.LUMEN_API || 'http://localhost:8000/api';

export const getAllPosts = async (req: express.Request, res: express.Response) => {
  try {
    const cached = await redis.get('posts');
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const lumenRes = await axios.get(`${LUMEN_API}/posts`, {
      headers: { Authorization: req.headers.authorization || '' }
    });

    await redis.set('posts', JSON.stringify(lumenRes.data), { EX: 300 }); // cache for 5 mins
    res.json(lumenRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  try {
    const cached = await redis.get(`post:${id}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const lumenRes = await axios.get(`${LUMEN_API}/posts/${id}`, {
      headers: { Authorization: req.headers.authorization || '' }
    });

    await redis.set(`post:${id}`, JSON.stringify(lumenRes.data), { EX: 300 });
    res.json(lumenRes.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};