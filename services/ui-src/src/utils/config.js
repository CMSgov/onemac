export default {
    MAX_ATTACHMENT_SIZE_MB: 50,
    ALLOW_DEV_LOGIN: window._env_.ALLOW_DEV_LOGIN,
    s3: {
        REGION: window._env_.S3_ATTACHMENTS_BUCKET_REGION,
        BUCKET: window._env_.S3_ATTACHMENTS_BUCKET_NAME
    },
    apiGateway: {
        REGION: window._env_.API_REGION,
        URL: window._env_.API_URL
    },
    cognito: {
        REGION: window._env_.COGNITO_REGION,
        USER_POOL_ID: window._env_.COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: window._env_.COGNITO_USER_POOL_CLIENT_ID,
        APP_CLIENT_DOMAIN: window._env_.COGNITO_USER_POOL_CLIENT_DOMAIN,
        IDENTITY_POOL_ID: window._env_.COGNITO_IDENTITY_POOL_ID,
    }
};
