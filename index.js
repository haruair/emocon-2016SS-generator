var koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = koa();

app.use(bodyParser());

app.use(function *(next) {
  yield next;

  this.body = this.body || {};

  if(this.error) {
    this.body.ok = false;
    this.body.error = this.error;
  } else {
    this.body.ok = true;
  }
});

app.use(function *() {
  var request = this.request;
  var username = request.query.username;

  if(!username) {
    return this.error = 'username_required';
  }

  this.body = this.body || {};

  try {
    var user = yield getUser(username);
    if(user) {
      this.body.user = {
        username: user.login,
        url: user.html_url
      };
    }
  } catch (err) {
    this.error = 'user_not_exists';
  }
});

app.listen(process.env.PORT || 3000);
