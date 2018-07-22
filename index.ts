export type token = { type: string; value: string; index: number };
export type rule = { type: string; pattern: RegExp };

export default class Tokenizer {
  public readonly rules: rule[] = [
    { type: 'Number', pattern: /[\d]+/ },
    { type: 'Whitespace', pattern: /[\s]+/ },
    { type: 'AdditionOperator', pattern: /\+/ },
    { type: 'SubtractionOperator', pattern: /\-/ },
    { type: 'MultiplicationOperator', pattern: /\*/ },
    { type: 'DivisionOperator', pattern: /\// },
    { type: 'OpenParenthesis', pattern: /\(/ },
    { type: 'CloseParenthesis', pattern: /\)/ },
  ];

  public tokenize(originalInput: string): token[] {
    let input = originalInput;
    let currentIndex = 0;
    let tokens: token[] = [];

    while (input) {
      const hasTokens = this.rules.some(({ pattern }) => {
        return !!pattern.exec(input);
      });

      if (!hasTokens) {
        throw new Error(
          `Did not find anymore valid tokens: "${input}" (Originally: ${originalInput}).`,
        );
      }

      for (const { type, pattern } of this.rules) {
        const match = pattern.exec(input);

        if (match) {
          const [ value ] = match;
          const index = currentIndex + match.index;

          tokens.push({ type, value, index });
          input = input.slice(value.length);
          currentIndex += value.length;
        }
      }
    }

    return tokens;
  }

  public addRule(rule: rule) {
    this.rules.push(rule);
  }
}
