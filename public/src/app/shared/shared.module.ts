import { KeysPipe } from './pipes/object-to-array.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [OrderByPipe, KeysPipe],
    exports: [OrderByPipe, KeysPipe]
})
export class SharedModule { }