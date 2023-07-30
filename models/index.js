const User = require('./User');
const Blogpost = require('./Blogpost');
const Comments = require('./Comments');

User.hasMany(Blogpost, {
    foreignKey: 'user_id'
});

Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});

// blogpost has many comments
Blogpost.hasMany(Comments, {
    foreignKey: 'post_id'
})
// comment belongs to blogpost
Comments.belongsTo(Blogpost, {
    foreignKey: 'post_id'
})

module.exports = { User, Blogpost, Comments };