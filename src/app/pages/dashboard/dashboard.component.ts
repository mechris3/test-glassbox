import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { selectAllProjects } from '../../store/projects/projects.selectors';
import { selectAllTasks, selectOverdueTasks } from '../../store/tasks/tasks.selectors';
import { selectAllTeamMembers } from '../../store/team/team.selectors';
import { loadProjects } from '../../store/projects/projects.actions';
import { loadTasks } from '../../store/tasks/tasks.actions';
import { loadTeam } from '../../store/team/team.actions';

interface ActivityItem {
  id: number;
  message: string;
  time: string;
  type: 'task' | 'project' | 'team';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);

  projects$ = this.store.select(selectAllProjects);
  tasks$ = this.store.select(selectAllTasks);
  overdueTasks$ = this.store.select(selectOverdueTasks);
  team$ = this.store.select(selectAllTeamMembers);

  activeTasks$ = this.tasks$.pipe(
    map((tasks) => tasks.filter((t) => t.status === 'in-progress'))
  );

  summaryData$ = combineLatest([
    this.projects$,
    this.activeTasks$,
    this.overdueTasks$,
    this.team$,
  ]).pipe(
    map(([projects, activeTasks, overdueTasks, team]) => ({
      totalProjects: projects.length,
      activeTasks: activeTasks.length,
      overdueItems: overdueTasks.length,
      teamMembers: team.length,
    }))
  );

  recentActivity: ActivityItem[] = [
    { id: 1, message: 'Alice moved "Implement responsive navigation" to In Progress', time: '2 hours ago', type: 'task' },
    { id: 2, message: 'Bob added a new task to Mobile App v2', time: '4 hours ago', type: 'task' },
    { id: 3, message: 'Carol completed "Create wireframes for homepage"', time: '1 day ago', type: 'task' },
    { id: 4, message: 'Security Audit project started', time: '2 days ago', type: 'project' },
    { id: 5, message: 'Henry joined the Security Audit team', time: '3 days ago', type: 'team' },
    { id: 6, message: 'Design System project marked as completed', time: '1 week ago', type: 'project' },
  ];

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadTeam());
  }
}
