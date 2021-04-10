import { sum, isMax } from './helpers';

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

  describe('isMax', () => {
    it('should alows just numbers', () => {
      const resultWIthNums = isMax([ 1, 2, 3, 4 ]);
      expect(typeof resultWIthNums).toBe('number');

      const resultWIthString = isMax([ 'a', 2, 3, 4 ]);
      expect(resultWIthString).toBe('Invalid data');
    });

    it('show return the max value', () => {
      const result1 = isMax([ 1, 2, 3, 4 ]);
      expect(result1).toBe(4);

      const result2 = isMax([ 1, 6, 3, 4 ]);
      expect(result2).toBe(6);
    })
  });
});
