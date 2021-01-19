import jwt from 'jsonwebtoken';

const generatePolicy = function (principalId, effect, resource) {
  const authResponse = {
    principalId: -1,
    policyDocument: null,
  };

  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {
      Version: null,
      Statement: null,
    };
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {
      Action: null,
      Effect: null,
      Resource: null,
    };
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  // console.log(authResponse);
  return authResponse;
};

exports.handler = function (event, _context, callback) {
  const token = event.authorizationToken;

  if (!token) return callback('Unauthorized');

  jwt.verify(token.substring(7), process.env.JWT_SECRET, (err, decoded) => {
    if (err) return callback('Unauthorized');
    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
  });
};
