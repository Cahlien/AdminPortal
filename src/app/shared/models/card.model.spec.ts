import { Card } from './card.model';

describe('Cardregistration', () => {
  it('should create an instance', () => {
    expect(new Card("card_id", "user_id", "card_type", 0, "12349807", 0,
    "08-21-2021", "nick_name", 30, "8-21-2025")).toBeTruthy();
  });
});
