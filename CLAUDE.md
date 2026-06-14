# AROH Security Rules

## React Native Frontend Rules
- Never hardcode any API URL, key, or secret in any file
- All backend URLs go in app.config.js under `extra` — never inline
- Never use eval() or dynamic code execution
- All user inputs must be trimmed and length-validated before use
- Emergency contact phone numbers: strip non-numeric characters before storing
- GPS coordinates: validate latitude is between -90 and 90, longitude between -180 and 180
- Font weights: only '400' or '500' — never higher
- No console.log() calls in any screen file — use __DEV__ guard if needed

## When Backend Is Built (Node.js)
- Rate limit auth endpoints: 5 requests per 15 minutes per IP
- Rate limit general API: 60 requests per minute per IP  
- All trek data inputs validated with Zod before database write
- Passwords hashed with bcrypt minimum cost 12
- JWT secret minimum 32 characters, stored in .env only
- JWT expiry maximum 60 minutes, refresh tokens in httpOnly cookies
- Never return raw database errors to client
- CORS restricted to app origin only — no wildcard
- helmet middleware on all routes
- .env never committed to git — already in .gitignore

## Data Rules Specific to AROH
- Trek status data must always show source and timestamp — never show "Open" without a date
- User GPS path data never sent to any third party
- Emergency contact stored locally only — never sent to server without explicit user action
- Legal agreement logs: store userId + agreementType + timestamp + appVersion