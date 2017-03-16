import { OrderByPipe } from './pipes/order-by.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [OrderByPipe],
    exports: [OrderByPipe]
})
export class SharedModule { }