import {describe, expect, it} from 'vitest';

import * as MonacoPilot from '../src';

describe('MonacoPilot exports', () => {
  it('should export registerCopilot function', () => {
    expect(MonacoPilot.registerCopilot).toBeDefined();
    expect(typeof MonacoPilot.registerCopilot).toBe('function');
  });

  it('should export Copilot class', () => {
    expect(MonacoPilot.Copilot).toBeDefined();
    expect(typeof MonacoPilot.Copilot).toBe('function');
  });

  it('should not export any unexpected items', () => {
    const expectedExports = ['registerCopilot', 'Copilot'];
    const actualExports = Object.keys(MonacoPilot);

    expect(actualExports).toEqual(expect.arrayContaining(expectedExports));
    expect(actualExports.length).toBe(expectedExports.length);
  });
});
