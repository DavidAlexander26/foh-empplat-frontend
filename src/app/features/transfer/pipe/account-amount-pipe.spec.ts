import { AccountAmountPipe } from './account-amount-pipe';

describe('AccountAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
