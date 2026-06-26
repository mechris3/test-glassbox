# Journey 3: Project Filtering & Search

## Purpose

Verify the projects list supports filtering by status, sorting by multiple fields, and text search — including combined filter states and empty results.

---

## Scenario 3.1: Filter by Status

**Preconditions:** Authenticated, on `/projects`, all projects loaded

**Steps:**

1. Navigate to `/projects`
2. Verify all 6 projects are displayed initially
3. Click "Active" filter button (`data-testid="filter-status-active"`)
4. Count visible project cards
5. Verify all visible cards show "active" status badge
6. Click "Completed" filter button (`data-testid="filter-status-completed"`)
7. Count visible project cards
8. Verify all visible cards show "completed" status badge
9. Click "Archived" filter button (`data-testid="filter-status-archived"`)
10. Count visible project cards
11. Click "All" filter button (`data-testid="filter-status-all"`)
12. Verify all 6 projects are displayed again

**Expected Outcomes:**
- Active filter: 4 projects (Website Redesign, Mobile App v2, API Migration, Security Audit)
- Completed filter: 1 project (Design System)
- Archived filter: 1 project (Analytics Dashboard)
- All filter: 6 projects
- Active filter button shows selected state

---

## Scenario 3.2: Sort by Name

**Preconditions:** Authenticated, on `/projects`, "All" filter selected

**Steps:**

1. Click "Name" sort button (`data-testid="sort-by-name"`)
2. Read the names of all visible project cards in order
3. Click "Name" sort button again (toggle direction)
4. Read the names again

**Expected Outcomes:**
- First click: alphabetical A→Z (Analytics Dashboard, API Migration, Design System, Mobile App v2, Security Audit, Website Redesign)
- Second click: reverse Z→A

---

## Scenario 3.3: Sort by Priority

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Click "Priority" sort button (`data-testid="sort-by-priority"`)
2. Read the priority badges of visible project cards in order

**Expected Outcomes:**
- High priority projects appear first, then medium, then low
- Clicking again reverses the order

---

## Scenario 3.4: Sort by Date

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Click "Date" sort button (`data-testid="sort-by-date"`)
2. Read the due dates of visible project cards in order

**Expected Outcomes:**
- Projects ordered by due date ascending (earliest first)
- Clicking again reverses to latest first

---

## Scenario 3.5: Text Search

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Type `mobile` in the search box (`data-testid="projects-search"`)
2. Count visible project cards
3. Verify "Mobile App v2" is shown
4. Clear the search box
5. Verify all projects return
6. Type `security` in the search box
7. Verify "Security Audit" is shown
8. Type `xyznonexistent` in the search box
9. Verify empty state message appears (`data-testid="projects-empty"`)

**Expected Outcomes:**
- Search matches against project name and description (case-insensitive)
- Results update as user types
- Non-matching query shows empty state

---

## Scenario 3.6: Combined Filter + Search

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Set filter to "Active" (`data-testid="filter-status-active"`)
2. Type `api` in search box
3. Count visible results

**Expected Outcomes:**
- Only "API Migration" shows (active + matches "api")
- Clearing search while filter is still active returns all active projects

---

## Scenario 3.7: Click Through to Project Detail

**Preconditions:** Authenticated, on `/projects`

**Steps:**

1. Click on the "Website Redesign" project card (`data-testid="project-card-1"`)
2. Verify navigation to `/projects/1`
3. Verify project detail page loads (`data-testid="project-detail-page"`)
4. Verify project name matches (`data-testid="project-detail-name"`)

**Expected Outcomes:**
- Clicking a project card navigates to its detail page
- Detail page shows correct project information

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Projects page | `projects-page` |
| Search input | `projects-search` |
| Status filter group | `projects-status-filter` |
| Filter: All | `filter-status-all` |
| Filter: Active | `filter-status-active` |
| Filter: Completed | `filter-status-completed` |
| Filter: Archived | `filter-status-archived` |
| Sort group | `projects-sort` |
| Sort: Name | `sort-by-name` |
| Sort: Date | `sort-by-date` |
| Sort: Priority | `sort-by-priority` |
| Projects grid | `projects-list` |
| Project card N | `project-card-{id}` |
| Project name N | `project-name-{id}` |
| Project status N | `project-status-{id}` |
| Project priority N | `project-priority-{id}` |
| Empty state | `projects-empty` |
| Loading state | `projects-loading` |
