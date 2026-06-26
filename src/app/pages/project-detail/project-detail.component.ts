import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { selectProjectById } from '../../store/projects/projects.selectors';
import { selectTasksByProject } from '../../store/tasks/tasks.selectors';
import { selectAllTeamMembers } from '../../store/team/team.selectors';
import { loadProjects } from '../../store/projects/projects.actions';
import { loadTasks, addTask, updateTaskStatus, deleteTask } from '../../store/tasks/tasks.actions';
import { loadTeam } from '../../store/team/team.actions';
import { Project, Task, TeamMember } from '../../store/models';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
})
export class ProjectDetailComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  projectId$: Observable<number> = this.route.params.pipe(
    map((params) => +params['id'])
  );

  project$: Observable<Project | undefined> = this.projectId$.pipe(
    switchMap((id) => this.store.select(selectProjectById(id)))
  );

  tasks$: Observable<Task[]> = this.projectId$.pipe(
    switchMap((id) => this.store.select(selectTasksByProject(id)))
  );

  team$ = this.store.select(selectAllTeamMembers);

  progress$ = this.tasks$.pipe(
    map((tasks) => {
      if (tasks.length === 0) return 0;
      const done = tasks.filter((t) => t.status === 'done').length;
      return Math.round((done / tasks.length) * 100);
    })
  );

  addTaskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    assigneeId: [null, Validators.required],
    priority: ['medium', Validators.required],
    dueDate: ['', Validators.required],
  });

  showAddForm = false;
  showConfirmDialog = false;
  taskToDelete: number | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadTeam());
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.addTaskForm.reset({ priority: 'medium' });
    }
  }

  onAddTask(): void {
    if (this.addTaskForm.valid) {
      this.projectId$.pipe(map((id) => id)).subscribe((projectId) => {
        const formValue = this.addTaskForm.value;
        const task: Task = {
          id: Date.now(),
          projectId,
          name: formValue.name,
          assigneeId: +formValue.assigneeId,
          status: 'todo',
          priority: formValue.priority,
          dueDate: formValue.dueDate,
        };
        this.store.dispatch(addTask({ task }));
        this.addTaskForm.reset({ priority: 'medium' });
        this.showAddForm = false;
      }).unsubscribe();
    }
  }

  onStatusToggle(task: Task): void {
    const statusOrder: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    this.store.dispatch(updateTaskStatus({ taskId: task.id, status: nextStatus }));
  }

  requestDelete(taskId: number): void {
    this.taskToDelete = taskId;
    this.showConfirmDialog = true;
  }

  confirmDelete(): void {
    if (this.taskToDelete !== null) {
      this.store.dispatch(deleteTask({ taskId: this.taskToDelete }));
      this.taskToDelete = null;
    }
    this.showConfirmDialog = false;
  }

  cancelDelete(): void {
    this.taskToDelete = null;
    this.showConfirmDialog = false;
  }

  getTeamMemberName(members: TeamMember[], assigneeId: number): string {
    const member = members.find((m) => m.id === assigneeId);
    return member ? member.name : 'Unassigned';
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  }
}
