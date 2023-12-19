import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="bg-success p-2 text-center text-white">
                This is SportsStore
             </div>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SportsStore';
}
