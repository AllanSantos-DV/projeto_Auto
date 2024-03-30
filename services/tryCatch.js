async function tryCatchWrapper(fnOrConst, successMessage, errorMessage, req) {
    try {
        if (typeof fnOrConst === 'function') {
            await fnOrConst();
        }
        req.flash('success', successMessage);
    } catch (error) {
        req.flash('error', errorMessage);
    }
}

module.exports = tryCatchWrapper;
