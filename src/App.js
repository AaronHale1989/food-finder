import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import FoodRecognition from './components/foodrecognition/foodrecognition';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Rank from './components/rank/rank';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number: {
      value:30,
      density: {
        enable:true,
        value_area:800
      }
    }
  }
}

const app = new Clarifai.App({
 apiKey: '859be558cf2c4cba8a85543abbd6f210'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'' , 
      imageUrl:'',
      ingredients: {},
      route: 'signin', 
      isSignedIn: false, 
    }
  }

  onInputChange = (event) => {
    const clarifaiData = this.setState({input: event.target.value});
  }

  calculateIngredients = (data) => {
    const foodData = data.outputs[0].data.concepts;
    const ingred = document.getElementById("ingredients");
    const ingredArr = [];
    foodData.forEach(function(e, index){
      let newli = document.createElement("li");
      newli.setAttribute('class','foods');
      newli.innerHTML = [index + 1] + ':' + ' ' + e.name;
      ingred.appendChild(newli);
    })


  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
      app.models.predict( Clarifai.FOOD_MODEL, this.state.input).then(response => this.calculateIngredients(response))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
        params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ?<div>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FoodRecognition imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
              ?<Signin onRouteChange={this.onRouteChange}/>
              :<Register onRouteChange={this.onRouteChange}/>
            )
          
        }
      </div>
    );
  }
}

export default App;

