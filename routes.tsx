/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to "/home".
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/sign-up",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

export const signUpNestedRoutes = "/auth/sign-up"

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home"