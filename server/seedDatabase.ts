import sequelize from "./src/config/orm";
import { Celebrity } from "./src/models/Celebrity";

const celebritiesData = [
  {
    
    firstName: 'John',
    surname: 'Doe',
    bio: 'A famous actor known for his versatile roles.',
    image: 'https://example.com/john.jpg',
    stageName: 'Johnny',
    isConfirmed: true,
  },
  {
    firstName: 'Jane',
    surname: 'Smith',
    bio: 'An award-winning musician with a unique style.',
    image: 'https://example.com/jane.jpg',
    stageName: 'Janey',
    isConfirmed: true,
  },
  {
    firstName: 'Alice',
    surname: 'Johnson',
    bio: 'A renowned athlete with multiple world records.',
    image: 'https://example.com/alice.jpg',
    stageName: 'Alicia',
    isConfirmed: false,
  },
];

export const seedDatabase = async () => {
  try {
    await Celebrity.bulkCreate(celebritiesData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

