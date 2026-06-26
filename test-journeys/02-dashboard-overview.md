# Journey 2: Dashboard Overview

## Purpose

Verify the dashboard loads correctly after login, displays accurate summary data, shows the activity feed, and quick actions navigate properly.

---

## Scenario 2.1: Summary Cards Display Correct Data

**Preconditions:** Authenticated as any user, on `/dashboard`

**Steps:**

1. Login successfully
2. Navigate to `/dashboard` (should happen automatically after login)
3. Wait for summary cards to load
4. Read the value in "Total Projects" card (`data-testid="dashboard-total-projects"`)
5. Read the value in "Active Tasks" card (`data-testid="dashboard-active-tasks"`)
6. Read the value in "Overdue Items" card (`data-testid="dashboard-overdue-items"`)
7. Read the value in "Team Members" card (`data-testid="dashboard-team-members"`)

**Expected Outcomes:**
- Total Projects = 6 (from projects.json)
- Active Tasks = 4 (tasks with status "in-progress")
- Overdue Items = count of tasks past due date with status ≠ "done" (varies by current date)
- Team Members = 8 (from team.json)
- All cards are visible and rendered with numeric values

---

## Scenario 2.2: Activity Feed Renders

**Preconditions:** Authenticated, on `/dashboard`

**Steps:**

1. Locate the activity feed section (`data-testid="dashboard-activity-feed"`)
2. Count the number of activity items
3. Verify first item contains expected text

**Expected Outcomes:**
- 6 activity items are displayed
- Each item has a message and timestamp
- Activity dots have appropriate type styling (task/project/team)

---

## Scenario 2.3: Quick Actions Navigate Correctly

**Preconditions:** Authenticated, on `/dashboard`

**Steps:**

1. Click "View Projects" quick action (`data-testid="quick-action-view-projects"`)
2. Verify navigation to `/projects`
3. Navigate back to `/dashboard`
4. Click "Settings" quick action (`data-testid="quick-action-settings"`)
5. Verify navigation to `/settings`

**Expected Outcomes:**
- Each quick action navigates to the correct route
- Target pages load properly after navigation

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Dashboard page | `dashboard-page` |
| Dashboard title | `dashboard-title` |
| Summary section | `dashboard-summary` |
| Total projects card | `dashboard-total-projects` |
| Active tasks card | `dashboard-active-tasks` |
| Overdue items card | `dashboard-overdue-items` |
| Team members card | `dashboard-team-members` |
| Activity feed | `dashboard-activity-feed` |
| Activity item N | `activity-item-{id}` |
| Quick actions section | `dashboard-quick-actions` |
| View Projects action | `quick-action-view-projects` |
| Active Tasks action | `quick-action-active-tasks` |
| Settings action | `quick-action-settings` |
| New Project action | `quick-action-new-project` |
