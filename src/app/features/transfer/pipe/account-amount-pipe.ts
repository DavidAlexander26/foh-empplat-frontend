import { Pipe, PipeTransform } from '@angular/core';
import { Account } from '../interfaces/transfer.model';

@Pipe({
  name: 'accountAmount'
})
export class AccountAmountPipe implements PipeTransform {

  transform(account: Account): string {
    if (!account) return '';

    const { accountNumber, availableBalance, currency } = account;
    const formattedAmount = availableBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    const symbol = currency === 'USD' ? '$' : 'S/';

    return `${accountNumber}, ${symbol} ${formattedAmount}`;
  }

}
