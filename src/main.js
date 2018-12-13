// main.js
import $ from 'jquery';
import React from 'react';
//import {render} from 'react-dom';
import Greeter from './Greeter';
import Vue from 'vue';
import App23 from './App.vue';

import './main.css';//使用require导入css文件
import './css/common.scss';

var vm=new Vue({
	 el: '#app2',
  data: {
   message: 'Hello Vue!311'
  }
})
new Vue({
  el: '#app',
  template: '<App23/>',
  components: { App23 }
})

console.log(Greeter.texst);
$('#root').html(Greeter.texst);
//render(<Greeter />, document.getElementById('root'));
//$("#app2").html("1111111111111");
