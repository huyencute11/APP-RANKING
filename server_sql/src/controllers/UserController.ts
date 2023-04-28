import { Request, Response } from 'express';
import connection from '../Connect/Connect';
import jwt from 'jsonwebtoken';

//get user1
export const getAllScore = (req: Request, res: Response) => {
  const year = req.query.year; // Get year from request query parameters
  const month = req.query.month; // Get month from request query parameters

  let query = `
    SELECT u.id AS user_id, u.username AS username, u.email, u.password, u.img,
      COALESCE(SUM(l.total_likes), 0) AS total_likes,
      COALESCE(SUM(l.total_favorites), 0) AS total_favorites,
      COALESCE(c.total_comments, 0) AS total_comments,
      COALESCE((SUM(l.total_likes) - SUM(l.total_favorites)) * 3 + SUM(l.total_favorites) * 5 + c.total_comments * 10, 0) AS score,
      COALESCE(p.total_posts, 0) AS total_posts
    FROM users u
    LEFT JOIN (
      SELECT p.user_id, p.id AS post_id, 
        COUNT(*) AS total_likes,
        SUM(CASE WHEN l.is_love = true THEN 1 ELSE 0 END) AS total_favorites
      FROM posts p
      LEFT JOIN likes l ON p.id = l.post_id
      WHERE 1=1 `; // Adding a placeholder condition that is always true

  const params = []; // An array to hold the parameter values

  if (year) {
    query += ' AND YEAR(l.created_at) = ?'; // Adding year condition to the query
    params.push(year); // Adding year value to the parameter array
  }

  if (month) {
    query += ' AND MONTH(l.created_at) = ?'; // Adding month condition to the query
    params.push(month); // Adding month value to the parameter array
  }

  query += `
      GROUP BY p.user_id, p.id, l.is_love
    ) l ON u.id = l.user_id
    LEFT JOIN (
      SELECT p.user_id, COUNT(*) AS total_comments
      FROM posts p
      LEFT JOIN comments c ON p.id = c.post_id
      WHERE 1=1 `; // Adding a placeholder condition that is always true

  if (year) {
    query += ' AND YEAR(c.created_at) = ?'; // Adding year condition to the query
    params.push(year); // Adding year value to the parameter array
  }

  if (month) {
    query += ' AND MONTH(c.created_at) = ?'; // Adding month condition to the query
    params.push(month); // Adding month value to the parameter array
  }

  query += `
      GROUP BY p.user_id
    ) c ON u.id = c.user_id
    LEFT JOIN (
      SELECT user_id, COUNT(*) AS total_posts
      FROM posts
      GROUP BY user_id
    ) p ON u.id = p.user_id
    GROUP BY u.id, u.username, c.total_comments, p.total_posts
    ORDER BY score DESC;
  `;

  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error' });
    } else {

      let currentRank = 1;
      let previousRank = 1;
      let previousScore = null;
      for (const user of result) {
        if (user.score !== previousScore) {
          user.rank = currentRank;
          previousRank = currentRank;
        } else {
          user.rank = previousRank;
        }
        previousScore = user.score;
        currentRank++;
      }

      res.status(200).json(result);
    }
  });
}




//get want to go
//1 get score for user written post is be loved (5)
//2 get score for user love post (4)
//3 get score for user have commented post_love
//4 get score for user written post_love is be commented
export const getScoreWantToGo = (req: Request, res: Response) => {
  const year = req.query.year; // Get year from request query parameters
  const month = req.query.month; // Get month from request query parameters

  let query = `
  SELECT u.id AS user_id, u.username AS username, u.password, u.img,
  COALESCE(SUM(l.total_likes), 0) AS total_likes,
  COALESCE(SUM(l.total_favorites), 0) AS total_favorites,
  COALESCE(c.total_comments, 0) AS total_comments,
  COALESCE((SUM(l.total_likes) - SUM(l.total_favorites)) * 3 + SUM(l.total_favorites) * 5 + c.total_comments * 10, 0) AS score,
  COALESCE(p.total_posts, 0) AS total_posts
FROM users u
left JOIN (
SELECT p.user_id, 
COUNT(*) AS total_likes,
SUM(CASE WHEN l.is_love = true THEN 1 ELSE 0 END) AS total_favorites
FROM posts p
LEFT JOIN likes l ON p.id = l.post_id
  WHERE 1=1 `; // Adding a placeholder condition that is always true

  const params = []; // An array to hold the parameter values

  if (year) {
    query += ' AND YEAR(l.created_at) = ?'; // Adding year condition to the query
    params.push(year); // Adding year value to the parameter array
  }

  if (month) {
    query += ' AND MONTH(l.created_at) = ?'; // Adding month condition to the query
    params.push(month); // Adding month value to the parameter array
  }

  query += `
    GROUP BY p.user_id
  ) l ON u.id = l.user_id
  LEFT JOIN (
    SELECT p.user_id, COUNT(*) AS total_comments
    FROM posts p
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE 1=1 `; // Adding a placeholder condition that is always true

  if (year) {
    query += ' AND YEAR(c.created_at) = ?'; // Adding year condition to the query
    params.push(year); // Adding year value to the parameter array
  }

  if (month) {
    query += ' AND MONTH(c.created_at) = ?'; // Adding month condition to the query
    params.push(month); // Adding month value to the parameter array
  }

  query += `
        GROUP BY p.user_id
      ) c ON u.id = c.user_id
      LEFT JOIN (
        SELECT user_id, COUNT(*) AS total_posts
        FROM posts
        GROUP BY user_id
      ) p ON u.id = p.user_id
      GROUP BY u.id, u.username, c.total_comments, p.total_posts, l.total_favorites
      HAVING COALESCE(l.total_favorites, 0) > 0 
      ORDER BY score DESC;
    `;
  connection.query(query, params, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error' });
    } else {

      let currentRank = 1;
      let previousRank = 1;
      let previousScore = null;
      for (const user of result) {
        if (user.score !== previousScore) {
          user.rank = currentRank;
          previousRank = currentRank;
        } else {
          user.rank = previousRank;
        }
        previousScore = user.score;
        currentRank++;
      }

      res.status(200).json(result);
    }
  });
}

export const getAllUser = (req: Request, res: Response) => {
  connection.query('select * from users', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error' });
    } else {
      res.status(200).json(result);
    }
  });
}

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM users WHERE username = ' + connection.escape(username), (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: 'Username not found' })
    } else {
      if (result.length > 0) {

        if (password === result[0].password) {
          // res.status(200).json({message: 'Login successful'})
          const secret_key = process.env.SECRET_KEY
          const token = jwt.sign({
            username: result[0].username,
          }, secret_key || 'hihi', { expiresIn: '1h' })
          res.json({ token: token })
          console.log('token', token);
        }
        else {
          res.status(200).json({ message: 'Wrong password' })
        }
      } else {
        res.status(200).json({ message: 'User not found' })
      }
    }
  })
  //
}

