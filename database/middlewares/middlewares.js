const jwt = require("jsonwebtoken");

middlewares = {
    formatDate: (today) => {
        let date = new Date(today);
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
    
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
    
        date = yyyy + '-' + mm + '-' + dd;

        return date;
    },

    setDeadline: (days) => {
        let deadline = new Date().setDate((new Date().getDate() + days))
        return middlewares.formatDate(deadline);
    },

    checkAuth: (req, res, next) => {
        try {
            const token = (req.body.token || req.query.token || req.headers["authorization"]).split(" ")[1];
            const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
            req.userData = { email: decodedToken.email, userId: decodedToken.userId };
            next();
        } catch (error) {
            res.status(401).json({ message: "Auth failed!" });
        }
    }
}

module.exports = middlewares