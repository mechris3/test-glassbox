# Journey 8: Negative & Edge Cases

## Purpose

Test boundary conditions, error states, and unusual interaction patterns that could expose bugs in real-world usage. These are prime candidates for introducing deliberate failures to test Glassbox's diagnostics.

---

## Scenario 8.1: Rapid Form Submission

**Preconditions:** On `/login`

**Steps:**

1. Enter valid credentials
2. Click Submit rapidly 3 times in quick succession
3. Observe behavior

**Expected Outcomes:**
- Only one login request processes
- No duplicate navigation or errors
- Button disabled state prevents double-submission

---

## Scenario 8.2: Navigate Away During Async Operation

**Preconditions:** On `/settings`

**Steps:**

1. Make a settings change
2. Click "Save Settings"
3. Immediately navigate to `/dashboard` before the 500ms save completes
4. Navigate back to `/settings`

**Expected Outcomes:**
- No unhandled errors or broken state
- Settings may or may not have saved (tests async lifecycle)
- App doesn't crash or show stale success messages

---

## Scenario 8.3: Direct URL to Non-Existent Project

**Preconditions:** Authenticated

**Steps:**

1. Navigate directly to `/projects/999`
2. Wait for page to load

**Expected Outcomes:**
- "Project not found" message displays (`data-testid="project-not-found"`)
- "Back to Projects" link is functional (`data-testid="project-not-found-link"`)
- No console errors or blank page

---

## Scenario 8.4: Empty Project (No Tasks)

**Preconditions:** Authenticated, on `/projects/5` (Analytics Dashboard — archived, has 2 done tasks initially but could be emptied)

**Steps:**

1. Navigate to `/projects/5`
2. Delete all tasks one by one (if any exist)
3. Verify empty state message appears (`data-testid="tasks-empty"`)
4. Verify progress bar shows 0%
5. Add a new task
6. Verify empty state disappears and task list renders

**Expected Outcomes:**
- Empty state handles gracefully (no divide-by-zero in progress calc)
- Progress shows 0% when no tasks exist
- Transitioning from empty to having tasks works correctly

---

## Scenario 8.5: Search With Special Characters

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Type `<script>alert('xss')</script>` in the search box
2. Type `%20%00` in the search box
3. Type `"quotes"` in the search box

**Expected Outcomes:**
- No XSS execution
- No app crashes
- Empty results shown (no projects match)
- Input is safely handled as plain text

---

## Scenario 8.6: Keyboard Navigation

**Preconditions:** Authenticated, on `/login` form

**Steps:**

1. Tab through all form fields
2. Verify focus outline is visible (`:focus-visible` styles)
3. Press Enter to submit form
4. After login, tab through sidebar navigation links

**Expected Outcomes:**
- All interactive elements are keyboard-accessible
- Focus indicators are visible
- Enter key triggers form submission
- Tab order follows logical reading order

---

## Scenario 8.7: Rapid Status Toggling

**Preconditions:** On `/projects/1`

**Steps:**

1. Click a task's toggle button 10 times rapidly
2. Wait for all state updates to settle
3. Verify the final status is consistent

**Expected Outcomes:**
- Each click cycles status: todo → in-progress → done → todo (repeating)
- 10 clicks should land on a predictable status (10 mod 3 = 1 step forward from start)
- No UI glitches or stuck states
- Progress bar reflects final state

---

## Scenario 8.8: Browser Back/Forward Navigation

**Preconditions:** Authenticated

**Steps:**

1. Navigate: Dashboard → Projects → Project Detail (ID 1)
2. Click browser Back button
3. Verify return to Projects list
4. Click browser Back button again
5. Verify return to Dashboard
6. Click browser Forward button
7. Verify return to Projects

**Expected Outcomes:**
- Angular router history works with browser navigation
- Pages re-render correctly on back/forward
- No state corruption from history navigation

---

## Scenario 8.9: Concurrent Data Loading

**Preconditions:** Authenticated, just logged in

**Steps:**

1. Navigate directly to `/projects/1` (skipping dashboard)
2. Verify that both projects AND tasks AND team data load
3. Tasks should display with assignee names resolved

**Expected Outcomes:**
- Multiple NgRx effects fire in parallel (loadProjects, loadTasks, loadTeam)
- All data resolves before rendering dependent UI
- No "undefined" or "Unassigned" showing for team members that exist

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Project not found | `project-not-found` |
| Not found link | `project-not-found-link` |
| Tasks empty state | `tasks-empty` |
| Projects empty state | `projects-empty` |
