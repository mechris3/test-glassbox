import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectSettings, selectSettingsSaved } from '../../store/settings/settings.selectors';
import { updateSettings, resetSettings, saveSettings } from '../../store/settings/settings.actions';
import { UserSettings } from '../../store/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  saved$ = this.store.select(selectSettingsSaved);

  settingsForm: FormGroup = this.fb.group({
    theme: ['dark'],
    notifications: this.fb.group({
      email: [true],
      push: [true],
      inApp: [true],
      weeklyDigest: [false],
    }),
    profile: this.fb.group({
      displayName: [''],
      avatarUrl: [''],
    }),
  });

  ngOnInit(): void {
    this.store.select(selectSettings).pipe(take(1)).subscribe((settings) => {
      this.settingsForm.patchValue(settings);
    });
  }

  onThemeChange(theme: 'dark' | 'light'): void {
    this.settingsForm.get('theme')?.setValue(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  onSave(): void {
    const settings: UserSettings = this.settingsForm.value;
    this.store.dispatch(updateSettings({ settings }));
    this.store.dispatch(saveSettings());
  }

  onReset(): void {
    this.store.dispatch(resetSettings());
    this.store.select(selectSettings).pipe(take(1)).subscribe((settings) => {
      this.settingsForm.patchValue(settings);
      document.documentElement.setAttribute('data-theme', settings.theme);
    });
  }
}
