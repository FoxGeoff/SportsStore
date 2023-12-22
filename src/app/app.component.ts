import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StoreComponent } from './store/store.component';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule, StoreComponent],
  template: `<div class="bg-success p-2 text-center text-white">
                This is SportsStore
             </div>
             <app-store></app-store>
            `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SportsStore';
}
