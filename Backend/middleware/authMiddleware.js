const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];
        const userId = req.headers['x-user-id'];

        if (!userRole) {
            return res.status(401).json({ message: 'Unauthorized: Missing x-user-role header' });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        // For 'user' role, require x-user-id
        if (userRole === 'user' && !userId) {
            return res.status(400).json({ message: 'Bad Request: Missing x-user-id header for user role' });
        }

        req.user = { role: userRole, id: userId };
        next();
    };
};

module.exports = authMiddleware;
