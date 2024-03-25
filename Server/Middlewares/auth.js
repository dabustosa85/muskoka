/**
 * Middleware to ensure that a user is logged in.
 * Redirects to the login page with an error message if not logged in.
 */
function ensureLoggedIn(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).redirect('/backend/login?error=You%20need%20to%20be%20logged%20in%20to%20access%20this%20page.');
    }
    next();
}

/**
 * Middleware to ensure that a user is an admin.
 * Redirects to the login page with an error message if not an admin.
 */
function ensureAdmin(req, res, next) {
    if (!req.session.user.isAdmin) {
        return res.status(401).redirect('/backend/login?error=You%20need%20to%20be%20an%20admin%20to%20access%20this%20page.');
    }
    next();
}

module.exports = { ensureLoggedIn, ensureAdmin };
