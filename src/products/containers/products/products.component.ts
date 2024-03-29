import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
    selector: 'products',
    styleUrls: ['products.component.scss'],
    template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <ng-container *ngIf="pizzas$ | async as pizzas">
            <div *ngIf="!((pizzas)?.length)">
                No pizzas, add one to get started.
            </div>
            <pizza-item *ngFor="let pizza of pizzas"
                [pizza]="pizza">
            </pizza-item>
        </ng-container>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
    pizzas$: Observable<Pizza[]>;

    constructor(private store: Store<fromStore.ProductsState>) { }

    ngOnInit() {
        this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    }
}
