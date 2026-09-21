import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [trailBlazers, summitSquad, metroMovers] = await Team.insertMany([
      { name: 'Trail Blazers', city: 'Seattle', coach: 'Nora Patel', memberCount: 14 },
      { name: 'Summit Squad', city: 'Denver', coach: 'Marcus Lee', memberCount: 18 },
      { name: 'Metro Movers', city: 'Atlanta', coach: 'Elena Garcia', memberCount: 12 },
    ]);

    const [ava, miles, priya, theo] = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        role: 'athlete',
        fitnessGoal: 'Build endurance for a spring half marathon',
        joinedAt: new Date('2026-01-08T10:00:00.000Z'),
      },
      {
        name: 'Miles Chen',
        email: 'miles.chen@example.com',
        role: 'captain',
        fitnessGoal: 'Improve strength and mobility',
        joinedAt: new Date('2026-01-15T10:00:00.000Z'),
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        role: 'athlete',
        fitnessGoal: 'Increase weekly active minutes',
        joinedAt: new Date('2026-02-02T10:00:00.000Z'),
      },
      {
        name: 'Theo Martin',
        email: 'theo.martin@example.com',
        role: 'athlete',
        fitnessGoal: 'Train consistently while recovering from travel',
        joinedAt: new Date('2026-02-11T10:00:00.000Z'),
      },
    ]);

    await Activity.insertMany([
      {
        user: ava._id,
        team: trailBlazers._id,
        type: 'Trail run',
        durationMinutes: 48,
        caloriesBurned: 510,
        completedAt: new Date('2026-09-18T14:30:00.000Z'),
      },
      {
        user: miles._id,
        team: summitSquad._id,
        type: 'Strength circuit',
        durationMinutes: 42,
        caloriesBurned: 390,
        completedAt: new Date('2026-09-19T12:00:00.000Z'),
      },
      {
        user: priya._id,
        team: metroMovers._id,
        type: 'Indoor cycling',
        durationMinutes: 55,
        caloriesBurned: 620,
        completedAt: new Date('2026-09-20T09:15:00.000Z'),
      },
      {
        user: theo._id,
        team: trailBlazers._id,
        type: 'Recovery yoga',
        durationMinutes: 30,
        caloriesBurned: 140,
        completedAt: new Date('2026-09-20T17:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: priya._id, team: metroMovers._id, rank: 1, points: 1840, weeklyMinutes: 265 },
      { user: ava._id, team: trailBlazers._id, rank: 2, points: 1710, weeklyMinutes: 238 },
      { user: miles._id, team: summitSquad._id, rank: 3, points: 1585, weeklyMinutes: 214 },
      { user: theo._id, team: trailBlazers._id, rank: 4, points: 1210, weeklyMinutes: 176 },
    ]);

    await Workout.insertMany([
      {
        title: 'Hill Sprint Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        recommendedForGoal: 'Build endurance for a spring half marathon',
      },
      {
        title: 'Desk Reset Mobility Flow',
        focusArea: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        recommendedForGoal: 'Train consistently while recovering from travel',
      },
      {
        title: 'Total Body Strength Ladder',
        focusArea: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        recommendedForGoal: 'Improve strength and mobility',
      },
      {
        title: 'Zone 2 Cycling Session',
        focusArea: 'Aerobic base',
        difficulty: 'Beginner',
        durationMinutes: 45,
        recommendedForGoal: 'Increase weekly active minutes',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
