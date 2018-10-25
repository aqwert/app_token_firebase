# app_token_firebase

AWS lambda function to verify a firebase token, and if so create a custom application token embedding the user id

## Process

- Serverless function that receives firebase token in the request
- Invoke firebase_verify_token (Google Cloud Function) to check if the token is valid
- If valid, create application token (based on JWT secret)
- Return new app token to be used in the application

`serverless deploy --verifyTokenUrl {FIREBASE_TOKEN_URL} --appSecret {APP_SECRET} --expiry '{TOKEN_EXPIRY_MILLISECONDS}'`
