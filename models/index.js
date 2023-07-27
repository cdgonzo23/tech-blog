const User = require('./User');
const Blogpost = require('./Blogpost');

User.hasMany(Blogpost, {
    foreignKey: 'user_id'
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});

// blogpost has many comments
// comment belongs to comment

module.exports = { User, Blogpost };