import AWS from "aws-sdk";

//Setup the database connection for localhost when running in offline mode.
let dbOptions = {};
if(process.env.IS_OFFLINE) {
  dbOptions = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  };
}

const client = new AWS.DynamoDB.DocumentClient(dbOptions);

export default {
  get   : (params) => client.get(params).promise(),
  put   : (params) => client.put(params).promise(),
  query : (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
