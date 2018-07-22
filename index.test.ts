import { describe, it } from 'mocha';
import { expect } from 'chai';
import Tokenizer, { token } from './';

describe('Tokenizer', () => {
  it('can identify a number', () => {
    const tokenizer = new Tokenizer();

    const input = '123';
    const expected: token[] = [{ type: 'Number', value: '123', index: 0 }];

    expect(tokenizer.tokenize(input)).to.deep.equal(expected);
  });

  it('can identify whitespace', () => {
    const tokenizer = new Tokenizer();

    const input = ' ';
    const expected: token[] = [{ type: 'Whitespace', value: ' ', index: 0 }];

    expect(tokenizer.tokenize(input)).to.deep.equal(expected);
  });

  it('can identify whitespace between two numbers', () => {
    const tokenizer = new Tokenizer();

    const input = '123 123';
    const expected: token[] = [
      { type: 'Number', value: '123', index: 0 },
      { type: 'Whitespace', value: ' ', index: 3 },
      { type: 'Number', value: '123', index: 4 }
    ];

    expect(tokenizer.tokenize(input)).to.deep.equal(expected);
  });

  it('can identify lots of whitespace between two numbers', () => {
    const tokenizer = new Tokenizer();

    const input = '123         123';
    const expected: token[] = [
      { type: 'Number', value: '123', index: 0 },
      { type: 'Whitespace', value: '         ', index: 3 },
      { type: 'Number', value: '123', index: 12 }
    ];

    expect(tokenizer.tokenize(input)).to.deep.equal(expected);
  });

  it('can support custom rules', () => {
    const tokenizer = new Tokenizer();

    tokenizer.addRule({ type: 'RandomGarbage', pattern: /poop/ });

    const input = 'poop';
    const expected: token[] = [
      { type: 'RandomGarbage', value: 'poop', index: 0 },
    ];

    expect(tokenizer.tokenize(input)).to.deep.equal(expected);
  });
});
