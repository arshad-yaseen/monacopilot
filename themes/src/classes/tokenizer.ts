import {LanguagesState, StateStack} from '../types';

export class TokenizerState implements LanguagesState {
  constructor(private _ruleStack: StateStack) {}

  public get ruleStack(): StateStack {
    return this._ruleStack;
  }

  public clone(): TokenizerState {
    return new TokenizerState(this._ruleStack);
  }

  public equals(other: LanguagesState): boolean {
    if (
      !other ||
      !(other instanceof TokenizerState) ||
      other !== this ||
      other._ruleStack !== this._ruleStack
    ) {
      return false;
    }

    return true;
  }
}
