'use strict';
var path = require('path');

const TOKEN_SECRET = '9872235F3757249E2076CBFE2F73FACEF954B6F59A521D2E56C34845B50A33BE2F0487E7F2E0C4ACBA8287A3C9526EB2D9FF8910A0C702C51DAC4C55D8BE7A24';
const API_TOKEN = '51AB143A4AE345317A3F66B179220A67356749435FC998193794DD549DDC0958649D94F1FF8263FAFE9CD5E61EB96F9FA2E208954C9B36AD6F8090B54620258C';

var _env = process.env.NODE_ENV || 'development';
var _port = process.env.PORT || 8000;

var root_dir = path.join(__dirname, '..');
var app_dir = path.join(root_dir, 'app');

module.exports = {
  env: _env,
  port: _port,
  tokenSecret: TOKEN_SECRET,
  apiToken: API_TOKEN
}
