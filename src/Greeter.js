//Greeter,js




//export default{
	//texst:config.greetText
//}
import React, {Component} from 'react'
import config from './config.json';

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}
console.log(config);
export default Greeter