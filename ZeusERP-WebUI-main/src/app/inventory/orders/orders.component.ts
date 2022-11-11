
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  navigateToOrder(orderId: number) {
    this.router.navigate(["/", "orders", orderId]);
  }

}
