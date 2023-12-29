function emailFormat(req, res, next) {
    const { login } = req.body;

    if (login) {
        // to check if the "login" parameter is a username
        if (login && !login.includes('@')) {
            return next();
        }
       // if not a username , validate the email format 
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = regex.test(login);
        if (!validEmail) {
            return res.jsend.fail({ message: "Invalid email" });
        } 
        next();
    } else {
        next();
    }
}

module.exports = emailFormat;
