export const passOnlyMembers = (req, res, next) => {
    if (req.session && req.session.userToken) {
        return next();
    }
    return res.redirect('/gate/login');
};

export const passOnlyGuests = (req, res, next) => {
    if (req.session && req.session.userToken) {
        return res.redirect('/dashboard');
    }
    return next();
};