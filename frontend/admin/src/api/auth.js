
const auth = {
    saveAuth: function (auth) {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, 
    getAuth: function () {
        try {
            return JSON.parse(localStorage.getItem('auth'));
        } catch (e) {
            return null;
        }
    }
}

export default auth;