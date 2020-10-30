const parseCookies = (req, res, next) => {
  var cookieObj = {};
  if (req.headers.cookie) {
    var cookie = req.headers.cookie;
    var cookieArray = cookie.split(';');
    for (var i = 0; i < cookieArray.length; ++i) {
      var key = cookieArray[i].split('=')[0].trim();
      var value = cookieArray[i].split('=')[1];
      cookieObj[key] = value;
    }
  }
  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;