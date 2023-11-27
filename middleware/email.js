function emailFormat(req, res, next) {
    const { email } = req.body;

    if (email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validEmail = regex.test(email);
        if (!validEmail) {
            return res.jsend.fail({ message: "Invalid email" });
        } 
        next();
    } else {
        next();
    }
}

module.exports = emailFormat;
