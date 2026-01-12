# AWS Database Integration Guide

This guide explains how to integrate BabaThings apps with AWS for data persistence and user authentication.

## Current State

Currently, the Coffee Grinder and Standup Timer apps store data locally in the browser's localStorage. The API service layer (`src/services/apiService.js`) is designed to seamlessly transition from localStorage to AWS API calls.

## Architecture Overview

```
┌─────────────────┐
│  Vue Component  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Service    │ ◄── Abstraction layer
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌──────────────┐
│LocalStor│ │  AWS API     │
│  age    │ │  Gateway +   │
│         │ │  Lambda +    │
│         │ │  DynamoDB    │
└─────────┘ └──────────────┘
```

## Setup Steps

### 1. AWS Infrastructure Setup

#### DynamoDB Tables

Create the following DynamoDB tables:

**Table: CoffeeEntries**
- Primary Key: `userId` (String)
- Sort Key: `entryId` (String)
- Attributes: `coffeeName`, `roaster`, `method`, `grindSetting`, `weight`, `waterRatio`, `temperature`, `roastLevel`, `brewTime`, `flavorNotes`, `rating`, `notes`, `image`, `date`

**Table: StandupSessions**
- Primary Key: `userId` (String)
- Sort Key: `sessionId` (String)
- Attributes: `date`, `participants`, `totalTime`, `individualTimes`

**Table: StandupSettings**
- Primary Key: `userId` (String)
- Attributes: `timePerPerson`, `warningTime`, `soundEnabled`, `participants`

**Table: Users**
- Primary Key: `userId` (String)
- Attributes: `email`, `username`, `createdAt`

#### Lambda Functions

Create Lambda functions for each API endpoint:

**Coffee API:**
- `GET /coffee/entries` - Get all entries for user
- `POST /coffee/entries` - Create new entry
- `PUT /coffee/entries/{id}` - Update entry
- `DELETE /coffee/entries/{id}` - Delete entry

**Standup API:**
- `GET /standup/sessions` - Get all sessions for user
- `POST /standup/sessions` - Save new session
- `GET /standup/settings` - Get user settings
- `POST /standup/settings` - Save user settings
- `GET /standup/participants` - Get saved participants
- `POST /standup/participants` - Save participants

**Authentication API:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### API Gateway

Create an API Gateway REST API with CORS enabled:
- Base URL: `https://api.babathings.com` (example)
- Enable CORS for all endpoints
- Add Lambda proxy integrations for each endpoint
- Add authentication via AWS Cognito or custom authorizer

#### AWS Cognito (Authentication)

1. Create a Cognito User Pool
2. Configure app client with:
   - Enable username/password auth
   - Enable email verification
   - Configure password policy
3. Create Identity Pool for user access management

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_ENDPOINT=https://api.babathings.com
VITE_AWS_REGION=us-east-1
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxx
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxx
```

### 3. Code Updates

The API service (`src/services/apiService.js`) is already prepared for AWS integration. When `VITE_API_ENDPOINT` is set, it will automatically switch from localStorage to API calls.

**To enable AWS integration:**

1. Set the environment variable `VITE_API_ENDPOINT` to your API Gateway URL
2. The service will automatically use API calls instead of localStorage
3. Implement authentication methods in `apiService.js`:

```javascript
async login(email, password) {
  const response = await fetch(`${this.apiEndpoint}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  this.setAuthToken(data.token);
  return data;
}
```

### 4. Sample Lambda Function (Node.js)

```javascript
// Lambda function for GET /coffee/entries
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const userId = event.requestContext.authorizer.claims.sub; // From Cognito
  
  const params = {
    TableName: 'CoffeeEntries',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    },
    ScanIndexForward: false // Sort by date descending
  };
  
  try {
    const result = await dynamodb.query(params).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch entries' })
    };
  }
};
```

### 5. Adding Authentication UI

Create login/register components and add them to the app. The authentication flow:

1. User visits app → Check for auth token
2. If not authenticated → Show login/register modal
3. User logs in → Receives JWT token
4. Token stored in localStorage and used for API calls
5. User can now save/retrieve data from AWS

### 6. Data Migration

When switching from localStorage to AWS:

1. Add export functionality to download existing data
2. User logs in for the first time
3. Prompt: "We found local data. Would you like to upload it to your account?"
4. Upload local data to AWS via API
5. Clear localStorage after successful upload

## Security Considerations

1. **Authentication**: All API endpoints must require authentication
2. **Authorization**: Ensure users can only access their own data
3. **Data Validation**: Validate all inputs in Lambda functions
4. **Rate Limiting**: Implement rate limiting in API Gateway
5. **HTTPS Only**: Ensure all API calls use HTTPS
6. **Token Expiration**: Implement token refresh logic
7. **CORS**: Configure CORS properly to allow only your domain

## Cost Estimation

For a small-to-medium user base (1000 users):

- **DynamoDB**: ~$5-10/month (with on-demand pricing)
- **Lambda**: ~$1-5/month (generous free tier)
- **API Gateway**: ~$3-10/month
- **Cognito**: Free tier covers up to 50,000 MAUs

**Total estimated cost**: $10-25/month for 1000 users

## Testing

1. Test with `VITE_API_ENDPOINT` unset (localStorage mode)
2. Deploy Lambda functions to AWS
3. Test each endpoint with Postman or curl
4. Set `VITE_API_ENDPOINT` in `.env`
5. Test authentication flow
6. Test data persistence across sessions and devices

## Deployment Checklist

- [ ] DynamoDB tables created
- [ ] Lambda functions deployed
- [ ] API Gateway configured
- [ ] Cognito User Pool created
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Authentication tested
- [ ] Data migration tested
- [ ] Production deployment

## Future Enhancements

1. Real-time sync using WebSockets (AWS AppSync)
2. Offline support with sync when online
3. Data export/import functionality
4. Team/group features for shared data
5. Analytics and insights
6. Mobile app integration

## Support

For questions or issues:
- Check AWS documentation
- Review CloudWatch logs for Lambda errors
- Test endpoints individually
- Verify Cognito configuration
