const { Blog } = require('../models');

const blogData = [
    {
        title: 'Why MVC is so important',
        author:'Xandromus',
        datePosted: '',
        description: 'MVC allows developers to maintain a true seperation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application design.',
    },
    {
        title: 'Authentication vs. Authorization',
        author:'Xandromus',
        datePosted: '',
        description: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    },
    {
        title: 'Object-Relational Mapping',
        author:'Lernantino',
        datePosted: '',
        description: 'I have really loved learning about ORMs. It has really simplified the way I create queries in SQL.',
    },
];

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;