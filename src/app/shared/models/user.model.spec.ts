import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User("test", "Test!123", "test@test.com", "1234567890",
      "test", "test", "2021-01-01", "admin", "abc-123-xyz-789")).toBeTruthy();
  });
});
