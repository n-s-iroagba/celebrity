import sequelize from "./src/config/orm"
import { Celebrity } from "./src/models/Celebrity"
import { ClubMembership } from "./src/models/ClubMembership"
import type { PerkDetail } from "./src/types/PerkDetail"

// Define some sample celebrities
const celebritiesData = [
  {
    id: 1, // Explicitly set IDs for predictable associations
    firstName: "John",
    surname: "Doe",
    bio: "A famous actor known for his versatile roles.",
    image: "https://example.com/john.jpg",
    stageName: "Johnny",
    isConfirmed: true,
    email: "john.doe@example.com", // Assuming email is required by User model part of Celebrity
    password: "hashed_password", // Assuming password is required
  },
  {
    id: 2,
    firstName: "Jane",
    surname: "Smith",
    bio: "An award-winning musician with a unique style.",
    image: "https://example.com/jane.jpg",
    stageName: "Janey",
    isConfirmed: true,
    email: "jane.smith@example.com",
    password: "hashed_password",
  },
]

// Define some sample club memberships with detailed perks
const clubMembershipsData = [
  // Memberships for John Doe (celebrityId: 1)
  {
    celebrityId: 1,
    tier: "Silver Fan",
    monthlySubscriptionAmount: 9.99,
    annualSubscriptionDiscount: 15, // 15% discount for yearly
    discountRate: 5, // 5% discount on merchandise
    features: [
      {
        name: "Monthly Newsletter",
        description: "Get a personalized newsletter from Johnny at the start of each month.",
      },
      {
        name: "Exclusive Photos",
        description: "Access to a gallery of behind-the-scenes photos, updated weekly.",
      },
    ] as PerkDetail[],
  },
  {
    celebrityId: 1,
    tier: "Gold Fan",
    monthlySubscriptionAmount: 24.99,
    annualSubscriptionDiscount: 20,
    discountRate: 10,
    features: [
      {
        name: "All Silver Perks",
        description: "Includes everything from the Silver Fan tier.",
      },
      {
        name: "Early Ticket Access",
        description: "24-hour early access to purchase tickets for all live events and tours.",
      },
      {
        name: "Monthly Live Q&A",
        description: "Join a members-only live video Q&A session with Johnny each month.",
      },
    ] as PerkDetail[],
  },
  // Memberships for Jane Smith (celebrityId: 2)
  {
    celebrityId: 2,
    tier: "Bronze Follower",
    monthlySubscriptionAmount: 4.99,
    annualSubscriptionDiscount: 10,
    discountRate: 0,
    features: [
      {
        name: "Discord Access",
        description: "Join the exclusive members-only channel on Janey's public Discord server.",
      },
      {
        name: "Unreleased Demos",
        description: "Listen to one unreleased song demo each month.",
      },
    ] as PerkDetail[],
  },
  {
    celebrityId: 2,
    tier: "Platinum Follower",
    monthlySubscriptionAmount: 49.99,
    annualSubscriptionDiscount: 25,
    discountRate: 15,
    features: [
      {
        name: "All Bronze Perks",
        description: "Includes everything from the Bronze Follower tier.",
      },
      {
        name: "Signed Digital Item",
        description: "Receive a unique, digitally signed item like a photo or lyric sheet every quarter.",
      },
      {
        name: "Producer Credit",
        description: "Get your name listed in the 'special thanks' section of her next album's liner notes.",
      },
      {
        name: "Direct Message",
        description: "Ability to send one direct message per month and get a guaranteed response.",
      },
    ] as PerkDetail[],
  },
]

export const seedDatabase = async () => {
  try {
    // It's often best to wrap seeding in a transaction
    await sequelize.transaction(async (t) => {
      // Use { force: true } in sync for development to clear tables before seeding.
      // In a real-world scenario, you'd use migrations.
      // For this example, we assume a clean slate.
      // await sequelize.sync({ force: true, transaction: t });

      // Clear existing data to prevent duplicates on re-run
      await ClubMembership.destroy({ where: {}, truncate: true, transaction: t })
      await Celebrity.destroy({ where: {}, truncate: true, cascade: true, transaction: t }) // cascade will also delete related User data if set up

      console.log("Cleared existing data...")

      // Seed Celebrities
      // We use 'ignoreDuplicates' in case the underlying User model has unique constraints like email
      await Celebrity.bulkCreate(celebritiesData, { transaction: t, ignoreDuplicates: true })
      console.log("Celebrities seeded successfully!")

      // Seed Club Memberships
      await ClubMembership.bulkCreate(clubMembershipsData, { transaction: t })
      console.log("Club Memberships seeded successfully!")
    })

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    // Optional: close connection if the script is standalone
    // await sequelize.close();
  }
}

// To run this script directly (e.g., `ts-node server/seedDatabase.ts`), you might add:
// if (require.main === module) {
//   seedDatabase();
// }
