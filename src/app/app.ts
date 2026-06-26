import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './store/auth/auth.selectors';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  private store = inject(Store);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
}
