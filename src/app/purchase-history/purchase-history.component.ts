import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  purchases: any[] = [];
  userEmail: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');

    if (this.userEmail) {
      this.http.get<any[]>('http://localhost:3000/purchases').subscribe(data => {
        this.purchases = data
          .filter(p => p.email === this.userEmail)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // más reciente arriba
      });
    }
  }
}