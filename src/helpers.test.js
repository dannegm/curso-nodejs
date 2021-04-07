import { sum } from './helpers';

describe('Helpers', () => {
  describe('sum', () => {
    it('should return 10 if pass 5 and 5 as params', () => {
      const result = sum(5, 5);
      expect(result).toBe(10);
    });

    it('should return 15 if pass 5 three times as params', () => {
      const result = sum(5, 5, 5);
      expect(result).toBe(15);
    });

    it('should return 15 if pass 5 three times as an array as param', () => {
      const result = sum(...[5, 5, 5]);
      expect(result).toBe(15);
    });
  });
});
