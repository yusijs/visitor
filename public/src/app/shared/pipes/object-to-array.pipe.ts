import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})

export class KeysPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (!(value instanceof Object)) {
            return;
        }
        else {
            return Object.keys(value);
        }
    }
}