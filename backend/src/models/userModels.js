import { v4 as uuidV4 } from "uuid";

let users = [];

// NOTE: userSchema - userStructure - Shape of my data that will be
// stored in my database for EVERY USER!
//
// id: uuid - always unique!
// username -> string -> must be unique!
// password -> String
// email -> String
// createdAt: new Date();

const User = {
  create({ username: targetUserName, email, password }) {
    const found = users.find(({ username }) => username === targetUserName);

    // NOTE: if it is already in list of users, we should not create one and
    // let the user known that it is already taken!
    if (found) {
      throw new Error("User is already in database!");
    }

    users.push({
      id: uuidV4(),
      username: targetUserName,
      password,
      email,
      createdAt: new Date(),
    });
  },

  findOne({ username: targetUserName }) {
    const found = users.find(({ username }) => username === targetUserName);

    if (found) {
      return found;
    }
  },

  // WARN: TESTING PURPOSES ONLY.
  // This should never exists like so!
  getUsers() {
    console.log('Hello users')
   return [...users]
    // return users;
  },
};

export { User };
