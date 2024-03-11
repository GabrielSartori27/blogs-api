module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'user@email.com',
        password: '$2b$10$C/QWbn.hg7VQ2aa72tnNeu8js6e10auhbky4ikZEtxEHAL33Gs5Wu', // password: test123
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        displayName: 'Michael Schumacher',
        email: 'user2@email.com',
        password: '$2b$10$MtYZacwLBIDrTDnw3tscSOBT.aslqlV9PFK9ckRp/4BpIDTz/XZNO', // password: test321
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
