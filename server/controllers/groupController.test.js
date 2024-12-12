// Import necessary libraries for testing
import request from 'supertest';
import app from '../app'; // Adjust the path to your app if needed

describe('Group API Tests', () => {
  it('should create a new group', async () => {
    // Define the new group data
    const newGroup = {
      group_name: 'Test Group',
      description: 'A test group description',
      password: 'password123', // Ensure password is a string
    };

    // Send the POST request to create the new group
    const response = await request(app)
      .post('/groups') // Adjust the endpoint if needed
      .send(newGroup)
      .expect(201); // Expect a 201 status code for successful creation

    // Assertions to verify the response
    expect(response.body.group_name).toBe('Test Group');
    expect(response.body.description).toBe('A test group description');
    expect(response.body.password).toBeUndefined(); // Ensure password is not returned in response
  });

  // Additional tests can go here
});
