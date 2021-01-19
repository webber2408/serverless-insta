import jwt from 'jsonwebtoken';

export const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
};
