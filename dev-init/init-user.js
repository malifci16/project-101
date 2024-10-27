const dbName = process.env.MONGO_DB_NAME || 'defaultDbName';
const userName = process.env.MONGO_USER_NAME || 'defaultUserName';
const userPassword = process.env.MONGO_USER_PASSWORD || 'defaultPassword';

db = db.getSiblingDB('budget-tracker-db');

db.createUser({
  user: userName,
  pwd: userPassword,
  roles: [
    {
      role: "readWrite",
      db: dbName,
    }
  ]
});
