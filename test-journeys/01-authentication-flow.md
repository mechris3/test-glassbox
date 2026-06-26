# Journey 1: Authentication Flow

## Purpose

Verify the complete login/logout cycle including validation, error handling, and session protection.

---

## Scenario 1.1: Successful Login

**Preconditions:** User is not authenticated, browser at `/login`

**Steps:**

1. Navigate to `http://localhost:4200`
2. Verify redirect to `/login`
3. Verify the login page is displayed (`data-testid="login-page"`)
4. Enter `alice@company.com` in the email field (`data-testid="login-email"`)
5. Enter `alice123` in the password field (`data-testid="login-password"`)
6. Click the Sign In button (`data-testid="login-submit"`)
7. Wait for navigation to `/dashboard`

**Expected Outcomes:**
- Dashboard page is visible (`data-testid="dashboard-page"`)
- Navigation sidebar shows user name "Alice Johnson" (`data-testid="nav-user-name"`)
- No error messages are displayed

---

## Scenario 1.2: Invalid Credentials

**Preconditions:** User is not authenticated, browser at `/login`

**Steps:**

1. Navigate to `/login`
2. Enter `alice@company.com` in email field
3. Enter `wrongpassword` in password field
4. Click Sign In button
5. Wait for error message to appear

**Expected Outcomes:**
- Error message "Invalid email or password" is displayed (`data-testid="login-error"`)
- User remains on `/login`
- Form fields retain their values
- Submit button is re-enabled after error

---

## Scenario 1.3: Form Validation

**Preconditions:** Browser at `/login`

**Steps:**

1. Click the email field and blur (tab away) without entering a value
2. Verify "Email is required" error (`data-testid="login-email-error"`)
3. Type `notanemail` in email field and blur
4. Verify "Invalid email format" error (`data-testid="login-email-format-error"`)
5. Click the password field and blur without entering a value
6. Verify "Password is required" error (`data-testid="login-password-error"`)
7. Type `ab` in password field and blur
8. Verify minimum length error (`data-testid="login-password-length-error"`)
9. Verify the Submit button is disabled while form is invalid

**Expected Outcomes:**
- Validation messages appear on field blur
- Submit button remains disabled until all validation passes

---

## Scenario 1.4: Logout

**Preconditions:** User is authenticated, on any page

**Steps:**

1. Login successfully (as per Scenario 1.1)
2. Navigate to dashboard
3. Click the Logout button in the sidebar (`data-testid="nav-logout"`)
4. Wait for navigation

**Expected Outcomes:**
- User is redirected to `/login`
- Attempting to navigate to `/dashboard` directly redirects back to `/login`
- Navigation sidebar is no longer visible

---

## Scenario 1.5: Route Guard — Unauthenticated Access

**Preconditions:** User is not authenticated

**Steps:**

1. Attempt to navigate directly to `http://localhost:4200/dashboard`
2. Attempt to navigate directly to `http://localhost:4200/projects`
3. Attempt to navigate directly to `http://localhost:4200/settings`

**Expected Outcomes:**
- All three attempts redirect to `/login`
- No flash of protected content before redirect

---

## Key Selectors

| Element | data-testid |
|---------|------------|
| Login page container | `login-page` |
| Email input | `login-email` |
| Password input | `login-password` |
| Submit button | `login-submit` |
| Auth error message | `login-error` |
| Email required error | `login-email-error` |
| Email format error | `login-email-format-error` |
| Password required error | `login-password-error` |
| Password length error | `login-password-length-error` |
| Logout button | `nav-logout` |
| User name display | `nav-user-name` |
