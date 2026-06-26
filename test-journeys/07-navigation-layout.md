# Journey 7: Navigation & Layout

## Purpose

Verify sidebar navigation behavior: active route indication, collapse/expand, and route transitions.

---

## Scenario 7.1: Active Route Highlighting

**Preconditions:** Authenticated, on `/dashboard`

**Steps:**

1. Verify the Dashboard nav link has active styling (`data-testid="nav-dashboard"`)
2. Click Projects nav link (`data-testid="nav-projects"`)
3. Verify Projects link now has active styling
4. Verify Dashboard link no longer has active styling
5. Click Settings nav link (`data-testid="nav-settings"`)
6. Verify Settings link has active styling

**Expected Outcomes:**
- Only the current route's nav link shows active state (gold color, highlighted bg)
- Active state updates immediately on navigation

---

## Scenario 7.2: Sidebar Collapse/Expand

**Preconditions:** Authenticated, sidebar expanded (default)

**Steps:**

1. Verify sidebar shows brand text "ProjectMgr" (`data-testid="nav-brand"`)
2. Verify nav links show labels
3. Click collapse button (`data-testid="nav-collapse-toggle"`)
4. Verify brand text is hidden
5. Verify nav labels are hidden (only icons visible)
6. Verify sidebar width is reduced
7. Click collapse button again (now shows ☰ icon)
8. Verify sidebar expands back to full width
9. Verify labels reappear

**Expected Outcomes:**
- Sidebar toggles between 260px and 68px width
- Collapse is animated (CSS transition)
- Icons remain visible in collapsed state
- User info section collapses to avatar only

---

## Scenario 7.3: User Info Display

**Preconditions:** Authenticated as Alice

**Steps:**

1. Locate user info section (`data-testid="nav-user-info"`)
2. Verify avatar image is displayed (`data-testid="nav-user-avatar"`)
3. Verify user name shows "Alice Johnson" (`data-testid="nav-user-name"`)
4. Collapse sidebar
5. Verify avatar is still visible but name is hidden

**Expected Outcomes:**
- User avatar loads from the URL in user data
- Name and role are visible in expanded state
- Only avatar visible in collapsed state

---

## Scenario 7.4: Navigation Not Visible When Unauthenticated

**Preconditions:** Not authenticated

**Steps:**

1. Navigate to `/login`
2. Verify sidebar is NOT present in the DOM
3. Verify only the login form is visible

**Expected Outcomes:**
- The `app-navigation` component is not rendered when `isAuthenticated` is false
- Login page takes full viewport width

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Sidebar | `navigation-sidebar` |
| Brand text | `nav-brand` |
| Collapse toggle | `nav-collapse-toggle` |
| Dashboard link | `nav-dashboard` |
| Projects link | `nav-projects` |
| Settings link | `nav-settings` |
| User info | `nav-user-info` |
| User avatar | `nav-user-avatar` |
| User name | `nav-user-name` |
| Logout button | `nav-logout` |
| App layout (authenticated) | `app-layout` |
