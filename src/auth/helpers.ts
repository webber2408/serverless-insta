import jwt from 'jsonwebtoken';

export const signToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};
