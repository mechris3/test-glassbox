# Journey 6: End-to-End User Journey

## Purpose

Simulate a realistic full session — login, check dashboard, browse projects, manage tasks, adjust settings, and logout. This validates that state persists correctly across page transitions and that the app behaves as a coherent whole.

---

## Scenario 6.1: Full Session Walkthrough

**Preconditions:** Fresh browser session, not authenticated

**Steps:**

1. Navigate to `http://localhost:4200`
2. Verify redirect to `/login`
3. Login as `alice@company.com` / `alice123`
4. Verify dashboard loads with summary cards
5. Note the "Active Tasks" count
6. Click "View Projects" quick action
7. Verify navigation to `/projects`
8. Filter by "Active" status
9. Click on "Website Redesign" project card
10. Verify project detail page loads
11. Toggle task ID 4 status from "todo" to "in-progress"
12. Add a new task: name "Review PR #42", assignee Bob Smith, priority high, due 2026-09-01
13. Verify new task appears in list
14. Navigate back to dashboard using sidebar nav (`data-testid="nav-dashboard"`)
15. Verify "Active Tasks" count increased by 1
16. Navigate to Settings via sidebar (`data-testid="nav-settings"`)
17. Change theme to light
18. Update display name to "Alice"
19. Save settings
20. Verify success message
21. Click Logout (`data-testid="nav-logout"`)
22. Verify redirect to `/login`
23. Verify protected routes are inaccessible

**Expected Outcomes:**
- State transitions flow correctly across pages
- Adding a task on project detail updates dashboard counts
- Theme change persists while navigating between pages
- Logout clears all auth state and prevents access

---

## Scenario 6.2: Multi-User Perspective

**Preconditions:** Fresh session

**Steps:**

1. Login as `bob@company.com` / `bob123`
2. Verify sidebar shows "Bob Smith" as user name
3. Navigate to projects
4. Click into "Mobile App v2"
5. Verify Bob's tasks are visible
6. Logout
7. Login as `carol@company.com` / `carol123`
8. Verify sidebar now shows "Carol Williams"

**Expected Outcomes:**
- Different users see the same project data (no user-scoped filtering)
- User identity correctly reflected in sidebar
- Logout fully clears previous user's state

---

## Key Selectors

All selectors from journeys 1-5 apply. Key cross-cutting ones:

| Element | data-testid |
|---------|------------|
| Nav: Dashboard | `nav-dashboard` |
| Nav: Projects | `nav-projects` |
| Nav: Settings | `nav-settings` |
| Nav: Logout | `nav-logout` |
| Nav: User name | `nav-user-name` |
