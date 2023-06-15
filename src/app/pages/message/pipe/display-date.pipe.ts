import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDisplay',
})
export class DateDisplayPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(date: any): string | null {
    return this.formatDate(date);
  }

  private formatDate(date: any): string | null {
    if (date) {
      // const now = new Date();
      // const diff = now.getTime() - date.toDate().getTime();
      // const minutes = Math.floor(diff / 60000);

      // if (minutes < 1) {
      //   return 'Vừa xong';
      // } else {
        return this.datePipe.transform(date.toMillis(), 'short');
      // }
    } else {
      return '';
    }
  }
}
