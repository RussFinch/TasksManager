const express = require('express');

const router = express.Router();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the
  // header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rfincham.eu.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  audience: 'http://localhost:3001',
  issuer: 'https://rfincham.eu.auth0.com/',
  algorithms: ['RS256'],
});

// Used to define the scope for private-scoped route.
const checkScopes = jwtAuthz(['read:messages']);

// This route doesn't need authentication
router.get('/public', (req, res) => {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to'
      + 'be authenticated to see this.',
  });
});

// This route needs authentication but no additional scopes
router.get('/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be'
      + 'authenticated to see this.',
  });
});

// This route needs authentication and additional scopes
router.get('/private-scoped', checkJwt, checkScopes, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be'
      + 'authenticated and have a scope of read:messages to see this.',
  });
});

module.exports = router;
