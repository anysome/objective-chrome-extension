var css = require('./assets/style.css');
console.log('css = %o', css);

var dt = require('dom-tree');
import config from './config.json';
import airloy from 'airloy';
import airloyWeb from 'airloy-web';
var api = require('./api.json');

airloy.configure(config);
airloy.use(airloyWeb);

async function entry() {
  let signed = await airloy.auth.setup();
  if (signed) {
    dt.add('#list',
      '<div class="todo"><a href="#"><img src="{box}"></a><p>{text}</p><span>昨天</span></div>',
      { link: 'foo.com', text: '大家风范空附近', box: require('./assets/images/checkbox_important.png')}
    );
    dt.add('#list',
      '<div class="todo"><a href="#"><img src="{box}"></a><p>{text}</p><span>昨天</span></div>',
      { link: 'foo.com', text: '大家风范空附近', box: require('./assets/images/checkbox_important.png')}
    );
    dt.add('#list',
      '<div class="todo"><a href="#"><img src="{box}"></a><p>{text}</p><span>昨天</span></div>',
      { link: 'foo.com', text: '大家风范空附近', box: require('./assets/images/checkbox_important.png')}
    );
  } else {
    dt.add('#list', '<div class="empty"><p>未登录帐号<br>可能导致数据丢失无法找回</p></div>');
    let result = await airloy.net.httpPost(api.public.try, airloy.auth.formUser(airloy.device.getIdentifier(), ''));
    if (result.success) {
      airloy.auth.saveUser(result.info);
    } else {
      console.log(result.message);
    }
  }
}


dt.add('#footer',
  '<a href="#" class="left"><img src="{leftIcon}"></a><a href="#" class="right"><img src="{rightIcon}"></a>',
  {leftIcon: require('./assets/images/login.png'), rightIcon: require('./assets/images/reload.png')}
);

