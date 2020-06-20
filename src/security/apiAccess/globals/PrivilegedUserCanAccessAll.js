/**
 * Privileged User can access all
 * ------------------------------
 * Used in DEV environments this global policy will grante access
 * to users that have a Privilege higher than Administrators (5)
 *
 * To verify APIEndpoint Access Rule use a Normal user!
 *
 * @param context Api Request Context
 */
export const PrivilegedUserCanAccessAll = (context) => {
    if (context.user.privilege >= 5) {
        context.accessGranted();
    }
    return true;
};
//# sourceMappingURL=PrivilegedUserCanAccessAll.js.map