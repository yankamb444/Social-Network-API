const connection = require('../config/connection');
const {
    User,
    Thoughts
} = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //   delete user collection
    await User.deleteMany({})
    await Thoughts.deleteMany({})


    const userseeds = [{
            username: 'userOne',
            email: 'emailOne'
        },
        {
            username: 'userTwo',
            email: 'emailTwo'
        }
    ]

    // Add students to the collection and await the results
    await User.collection.insertMany(userseeds);



    // Log out the seed data to indicate what should appear in the database
    console.table(userseeds);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});