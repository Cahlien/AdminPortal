import { Cardtype } from './cardtype.model';

describe('Cardtype', () => {
  it('should create an instance', () => {
    expect(new Cardtype(0, "type_name_example", 0)).toBeTruthy();
  });
});
