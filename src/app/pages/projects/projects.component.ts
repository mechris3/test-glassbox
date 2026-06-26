import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, BehaviorSubject, map } from 'rxjs';
import { selectAllProjects, selectProjectsLoading } from '../../store/projects/projects.selectors';
import { selectAllTasks } from '../../store/tasks/tasks.selectors';
import { loadProjects } from '../../store/projects/projects.actions';
import { loadTasks } from '../../store/tasks/tasks.actions';
import { Project } from '../../store/models';

type StatusFilter = 'all' | 'active' | 'completed' | 'archived';
type SortField = 'name' | 'dueDate' | 'priority';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  private store = inject(Store);

  loading$ = this.store.select(selectProjectsLoading);

  statusFilter$ = new BehaviorSubject<StatusFilter>('all');
  sortField$ = new BehaviorSubject<SortField>('name');
  sortDirection$ = new BehaviorSubject<SortDirection>('asc');
  searchQuery$ = new BehaviorSubject<string>('');

  projects$ = combineLatest([
    this.store.select(selectAllProjects),
    this.statusFilter$,
    this.sortField$,
    this.sortDirection$,
    this.searchQuery$,
  ]).pipe(
    map(([projects, status, sortField, sortDir, query]) => {
      let filtered = projects;

      if (status !== 'all') {
        filtered = filtered.filter((p) => p.status === status);
      }

      if (query.trim()) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      return [...filtered].sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'dueDate':
            comparison = a.dueDate.localeCompare(b.dueDate);
            break;
          case 'priority':
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
            break;
        }
        return sortDir === 'asc' ? comparison : -comparison;
      });
    })
  );

  taskCounts$ = this.store.select(selectAllTasks).pipe(
    map((tasks) => {
      const counts: Record<number, { total: number; done: number }> = {};
      tasks.forEach((t) => {
        if (!counts[t.projectId]) {
          counts[t.projectId] = { total: 0, done: 0 };
        }
        counts[t.projectId].total++;
        if (t.status === 'done') {
          counts[t.projectId].done++;
        }
      });
      return counts;
    })
  );

  statusFilter: StatusFilter = 'all';
  sortField: SortField = 'name';
  searchQuery = '';

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(loadTasks());
  }

  onStatusFilter(status: StatusFilter): void {
    this.statusFilter = status;
    this.statusFilter$.next(status);
  }

  onSortChange(field: SortField): void {
    if (this.sortField === field) {
      const current = this.sortDirection$.value;
      this.sortDirection$.next(current === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField = field;
      this.sortField$.next(field);
      this.sortDirection$.next('asc');
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.searchQuery$.next(query);
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }
}
