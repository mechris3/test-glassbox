import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { selectCurrentUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  private store = inject(Store);
  private router = inject(Router);

  user$ = this.store.select(selectCurrentUser);
  collapsed = false;

  navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', testId: 'nav-dashboard' },
    { path: '/projects', label: 'Projects', icon: '📁', testId: 'nav-projects' },
    { path: '/settings', label: 'Settings', icon: '⚙️', testId: 'nav-settings' },
  ];

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  onLogout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
