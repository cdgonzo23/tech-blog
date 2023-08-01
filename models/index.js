const User = require('./User');
const Blogpost = require('./Blogpost');
const Comments = require('./Comments');

Blogpost.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Blogpost.hasMany(Comments, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});



module.exports = { User, Blogpost, Comments };