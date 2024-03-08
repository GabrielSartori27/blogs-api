module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'user@email.com',
        password: '$2b$10$4KpBVHEZf2PCGdzkGrCXEe3FYEQlKyAvm.TZNR7EouwKUst1AQI2.', // password: 123456
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        displayName: 'Michael Schumacher',
        email: 'user2@email.com',
        password: '$2b$10$ywPF5CtY.6DaMN1uannNHuXUFZfTSgBzUDHfZWqCTcZUlMmxLGllu', // password: 654321
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
