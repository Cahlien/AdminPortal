<<<<<<< HEAD
import { Cardregistration } from './cardregistration.model';

describe('Cardregistration', () => {
  it('should create an instance', () => {
    expect(new Cardregistration()).toBeTruthy();
=======
import { CardRegistration } from './cardregistration.model';

describe('Cardregistration', () => {
  it('should create an instance', () => {
    expect(new CardRegistration("user_id", "card_type", 0.0, "nick_name", 30)).toBeTruthy();
>>>>>>> local-dev
  });
});
