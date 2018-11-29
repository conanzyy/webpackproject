// main.js
import $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import Vue from 'vue';
import App from './App.vue';

import './main.css';//使用require导入css文件
import './css/common.scss';

var vm=new Vue({
	 el: '#app2',
  data: {
   message: 'Hello Vue!2'
  }
})
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

render(<Greeter />, document.getElementById('root'));
