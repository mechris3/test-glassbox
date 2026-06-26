# Journey 5: Settings Persistence

## Purpose

Verify that user settings (theme, notifications, profile) can be modified, saved, and reset correctly — and that theme changes are reflected immediately in the UI.

---

## Scenario 5.1: Theme Toggle

**Preconditions:** Authenticated, on `/settings`, dark theme is default

**Steps:**

1. Navigate to `/settings`
2. Verify the dark theme button is selected (`data-testid="settings-theme-dark"`)
3. Click the light theme button (`data-testid="settings-theme-light"`)
4. Verify the `<html>` element's `data-theme` attribute changes to "light"
5. Verify visual change — background color shifts to light palette
6. Click the dark theme button again
7. Verify `data-theme` reverts to "dark"

**Expected Outcomes:**
- Theme switches immediately on click (no save required for visual preview)
- The selected theme button shows active/selected styling
- CSS custom properties update across the entire page
- Sidebar, cards, and all components reflect the new theme

---

## Scenario 5.2: Notification Preferences

**Preconditions:** Authenticated, on `/settings`

**Steps:**

1. Verify default checkbox states:
   - Email: checked (`data-testid="settings-notify-email"`)
   - Push: checked (`data-testid="settings-notify-push"`)
   - In-app: checked (`data-testid="settings-notify-inapp"`)
   - Weekly digest: unchecked (`data-testid="settings-notify-digest"`)
2. Uncheck "Email notifications"
3. Check "Weekly digest"
4. Click "Save Settings" (`data-testid="settings-save"`)
5. Verify success message appears (`data-testid="settings-saved-message"`)

**Expected Outcomes:**
- Checkboxes toggle on click
- Save triggers the settings effect (simulated 500ms delay)
- Success message "✓ Settings saved successfully" appears after save
- State is persisted in NgRx store

---

## Scenario 5.3: Profile Editing

**Preconditions:** Authenticated, on `/settings`

**Steps:**

1. Locate the display name field (`data-testid="settings-display-name"`)
2. Type "Christopher" in the display name field
3. Locate the avatar URL field (`data-testid="settings-avatar-url"`)
4. Type `https://i.pravatar.cc/150?u=christopher` in the avatar URL field
5. Click "Save Settings"
6. Verify success message appears

**Expected Outcomes:**
- Text inputs accept user input
- Values are included in the saved settings payload
- No validation errors for valid URL format

---

## Scenario 5.4: Reset to Defaults

**Preconditions:** Authenticated, on `/settings`, some settings have been modified

**Steps:**

1. Change theme to light
2. Uncheck some notification preferences
3. Enter text in profile fields
4. Click "Reset to Defaults" (`data-testid="settings-reset"`)
5. Verify form reverts to default values:
   - Theme: dark
   - Email: checked
   - Push: checked
   - In-app: checked
   - Weekly digest: unchecked
   - Display name: empty
   - Avatar URL: empty
6. Verify the page theme reverts to dark

**Expected Outcomes:**
- All form fields reset to initial/default values
- Theme reverts visually
- Reset does not trigger a "saved" message
- NgRx state resets to initial settings state

---

## Scenario 5.5: Save Feedback Timing

**Preconditions:** Authenticated, on `/settings`

**Steps:**

1. Make any change
2. Click "Save Settings"
3. Measure time until success message appears

**Expected Outcomes:**
- There is a ~500ms delay (simulated async save via NgRx effect)
- Success message appears after the delay
- This delay is a potential test target for race conditions — clicking save rapidly, navigating away before save completes

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Settings page | `settings-page` |
| Settings form | `settings-form` |
| Theme section | `settings-theme-section` |
| Dark theme button | `settings-theme-dark` |
| Light theme button | `settings-theme-light` |
| Notifications section | `settings-notifications-section` |
| Email checkbox | `settings-notify-email` |
| Push checkbox | `settings-notify-push` |
| In-app checkbox | `settings-notify-inapp` |
| Weekly digest checkbox | `settings-notify-digest` |
| Profile section | `settings-profile-section` |
| Display name input | `settings-display-name` |
| Avatar URL input | `settings-avatar-url` |
| Save button | `settings-save` |
| Reset button | `settings-reset` |
| Saved message | `settings-saved-message` |
