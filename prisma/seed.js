const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numUsers = 3, numPlaylists = 5) => {
  for (let i = 0; i < numUsers; i++) {
    const playlists = Array.from({ length: numPlaylists }, (_, j) => {
      const name = faker.internet.displayName();
      return {
        name,
        description: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
      };
    });

    await prisma.user.create({
      data: {
        username: faker.internet.displayName(),
        playlists: {
          create: playlists,
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })