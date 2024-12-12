import { createGroup, getUserGroups } from '../models/groupModel.js';
import { pool } from '../helper/db.js';

// Mock the database connection
jest.mock('../helper/db.js');

describe('Group Model Tests', () => {
  // Test creating a group
  it('should create a new group', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, group_name: 'Test Group', description: 'Test Description', owner_id: 1 }],
    });

    const result = await createGroup('Test Group', 'Test Description', 1);
    expect(result.group_name).toBe('Test Group');
    expect(result.description).toBe('Test Description');
    expect(result.owner_id).toBe(1);
  });

  // Test fetching groups for a user
  it('should return groups for a user', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, group_name: 'Test Group', description: 'Test Description' }],
    });

    const result = await getUserGroups(1);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].group_name).toBe('Test Group');
  });
});
