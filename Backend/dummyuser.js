const users = []

// User Join Chat
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);
    console.log(users, "users");

    return user;
}
console.log("User Out", users);

// Current User
function getCurrentUser(id) {
    return users.find((user) => 
        user.id === id
    );
}

// User Disconnect Chat
function userLeave(id) {
    const index = users.findIndex((user) => 
        user.id === id
    );

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {userJoin, getCurrentUser, userLeave,};