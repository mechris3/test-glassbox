# Journey 4: Task Lifecycle

## Purpose

Verify the full task CRUD lifecycle within a project: viewing tasks, toggling status, adding new tasks, and deleting tasks with confirmation.

---

## Scenario 4.1: View Tasks for a Project

**Preconditions:** Authenticated, navigated to `/projects/1` (Website Redesign)

**Steps:**

1. Login and navigate to `/projects/1`
2. Verify project detail page loads (`data-testid="project-detail-page"`)
3. Verify project name is "Website Redesign" (`data-testid="project-detail-name"`)
4. Locate the task list (`data-testid="task-list"`)
5. Count the number of task items

**Expected Outcomes:**
- 6 tasks displayed (IDs: 1, 2, 3, 4, 5, 24)
- Each task shows name, status badge, priority, assignee, and due date
- Tasks with status "done" show a strikethrough name and check icon

---

## Scenario 4.2: Progress Bar Accuracy

**Preconditions:** On `/projects/1`

**Steps:**

1. Read the progress percentage (`data-testid="project-progress-percent"`)
2. Count tasks with "done" status vs total tasks
3. Verify the progress bar visually matches

**Expected Outcomes:**
- Progress = (done tasks / total tasks) × 100, rounded
- For project 1 initially: 2 done out of 6 = 33%
- Progress bar width matches the percentage

---

## Scenario 4.3: Toggle Task Status

**Preconditions:** On `/projects/1`

**Steps:**

1. Find task "Build hero section component" (ID 4, status: todo)
2. Verify its status badge shows "To Do" (`data-testid="task-status-4"`)
3. Click its toggle button (`data-testid="task-toggle-4"`)
4. Verify status changes to "In Progress"
5. Verify the toggle icon changes from ○ to ◐
6. Click the toggle button again
7. Verify status changes to "Done"
8. Verify the toggle icon changes to ✓
9. Verify the task name gets strikethrough styling
10. Click toggle again
11. Verify status cycles back to "To Do"

**Expected Outcomes:**
- Status cycles: todo → in-progress → done → todo
- UI updates immediately on each click
- Progress bar updates after each toggle
- Status badge text and styling update correctly

---

## Scenario 4.4: Add a New Task

**Preconditions:** On `/projects/1`

**Steps:**

1. Click "+ Add Task" button (`data-testid="add-task-toggle"`)
2. Verify the add task form appears (`data-testid="add-task-form"`)
3. Type "Write unit tests" in the name field (`data-testid="add-task-name"`)
4. Select "Bob Smith" from assignee dropdown (`data-testid="add-task-assignee"`)
5. Select "High" priority (`data-testid="add-task-priority"`)
6. Enter `2026-08-01` as due date (`data-testid="add-task-due-date"`)
7. Click "Add Task" submit button (`data-testid="add-task-submit"`)
8. Verify the form closes
9. Verify the new task appears in the task list

**Expected Outcomes:**
- New task "Write unit tests" appears at the bottom of the task list
- Task shows status "To Do", priority "High", assignee "Bob Smith", due date "2026-08-01"
- Task count increases by 1
- Progress bar denominator increases
- Form resets and hides after successful submission

---

## Scenario 4.5: Add Task — Validation

**Preconditions:** On `/projects/1`, add task form open

**Steps:**

1. Click "+ Add Task" to open form
2. Leave all fields empty
3. Verify "Add Task" submit button is disabled (`data-testid="add-task-submit"`)
4. Fill only the name field with "ab" (less than 3 chars)
5. Verify button remains disabled
6. Fill name with "Valid task name"
7. Verify button remains disabled (assignee and date still missing)
8. Select an assignee
9. Verify button remains disabled (date still missing)
10. Enter a due date
11. Verify button becomes enabled

**Expected Outcomes:**
- Submit button is disabled until all required fields pass validation
- Name requires minimum 3 characters
- Assignee and due date are required

---

## Scenario 4.6: Delete a Task with Confirmation

**Preconditions:** On `/projects/1`, tasks loaded

**Steps:**

1. Note the current task count
2. Click the delete button for task "SEO optimization audit" (ID 5) (`data-testid="task-delete-5"`)
3. Verify confirmation dialog appears (`data-testid="confirm-dialog"`)
4. Verify dialog title says "Delete Task" (`data-testid="confirm-dialog-title"`)
5. Verify dialog message mentions the action is irreversible (`data-testid="confirm-dialog-message"`)
6. Click "Confirm" button (`data-testid="confirm-yes"`)
7. Verify dialog closes
8. Verify the task is removed from the list
9. Verify task count decreased by 1
10. Verify progress bar updates

**Expected Outcomes:**
- Confirmation dialog blocks deletion until user confirms
- Task is removed from the DOM after confirmation
- NgRx state updates (task no longer in store)

---

## Scenario 4.7: Cancel Task Deletion

**Preconditions:** On `/projects/1`, tasks loaded

**Steps:**

1. Click the delete button for any task
2. Verify confirmation dialog appears
3. Click "Cancel" button (`data-testid="confirm-cancel"`)
4. Verify dialog closes
5. Verify the task is still present in the list

**Expected Outcomes:**
- Cancel dismisses the dialog without side effects
- Task remains in list with same state
- Clicking the backdrop also dismisses (via `confirm-dialog-backdrop`)

---

## Scenario 4.8: Toggle Add Form Open/Close

**Preconditions:** On `/projects/1`

**Steps:**

1. Click "+ Add Task" button — verify form appears, button text changes to "Cancel"
2. Click "Cancel" button — verify form disappears, button text returns to "+ Add Task"
3. Re-open form, fill in some fields, click "Cancel"
4. Re-open form and verify all fields are reset

**Expected Outcomes:**
- Form toggles visibility on button click
- Cancelling clears form state

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Project detail page | `project-detail-page` |
| Project name | `project-detail-name` |
| Progress percent | `project-progress-percent` |
| Progress bar | `project-progress-bar` |
| Task list | `task-list` |
| Task item N | `task-item-{id}` |
| Task toggle N | `task-toggle-{id}` |
| Task name N | `task-name-{id}` |
| Task status N | `task-status-{id}` |
| Task priority N | `task-priority-{id}` |
| Task assignee N | `task-assignee-{id}` |
| Task due N | `task-due-{id}` |
| Task delete N | `task-delete-{id}` |
| Add task toggle button | `add-task-toggle` |
| Add task form | `add-task-form` |
| Task name input | `add-task-name` |
| Task assignee dropdown | `add-task-assignee` |
| Task priority dropdown | `add-task-priority` |
| Task due date input | `add-task-due-date` |
| Add task submit | `add-task-submit` |
| Confirm dialog | `confirm-dialog` |
| Confirm title | `confirm-dialog-title` |
| Confirm message | `confirm-dialog-message` |
| Confirm yes button | `confirm-yes` |
| Confirm cancel button | `confirm-cancel` |
| Empty task state | `tasks-empty` |
