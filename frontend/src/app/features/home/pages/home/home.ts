import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: false,
  styleUrls: ['./home.css'],
  template: `<p>{{ statusMessage }}</p>`,
})
export class HomeComponent {
  statusMessage: string = '';

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/status').subscribe({
      next: (res) => this.statusMessage = res.message,
      error: () => this.statusMessage = '❌ No se pudo conectar al backend'
    });
  }
}
