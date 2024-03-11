import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.token
        if (!authHeader) {
            return res.status(400).json({ error: "token not found" })
        }

        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token.' });
            }
            req.user = user
            next()
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "Don't have access" });
        }
    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "Don't have access" });
        }
    })
}



export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
