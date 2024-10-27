apiVersion: v1
kind: ConfigMap
metadata:
  name: mongo-init-script
  namespace: budget-tracker
data:
  mongo-entrypoint.sh: |
    #!/bin/bash

    # Ensure MongoDB is running in the background
    mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

    # Run the mongo shell commands with environment variables
    mongo <<EOF
    const dbName = "${MONGO_DB_NAME}";
    const userName = "${MONGO_USER_NAME}";
    const userPassword = "${MONGO_USER_PASSWORD}";

    db = db.getSiblingDB(dbName);

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
    EOF

    # Bring MongoDB back to the foreground
    mongod --dbpath /data/db
