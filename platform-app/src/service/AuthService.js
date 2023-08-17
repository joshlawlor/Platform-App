module.exports = {
    getUser: function () {
      const user = sessionStorage.getItem('user');
      try {
        return JSON.parse(user);
      } catch (err) {
        console.log('Error parsing user:', err);
        return null;
      }
    },
  
    getToken: function () {
      return sessionStorage.getItem('token');
    },
  
    setUserSession: function (user, token) {
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
    },
  
    resetUserSession: function () {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  };