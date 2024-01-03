import { describe, it, expect } from 'vitest';
import { validate } from './validation';

describe('validate', () => { 
    it('validateがtrueを返す', () => {
        expect(validate('https://www.google.com')).toBe(true);
    })

    it('validateがfalseを返さない', () => {
        expect(validate('https://www.google.com')).not.toBe(false);
    })
 })