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

const initialState = {
      input:'' , 
      imageUrl:'',
      ingredients: {},
      route: 'signin', 
      isSignedIn: false, 
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }



  onInputChange = (event) => {
     this.setState({input: event.target.value});
  }

  calculateIngredients = (data) => {
    const foodData = data.outputs[0].data.concepts;
    const ingred = document.getElementById("ingredients");
    foodData.forEach(function(e, index){
      let newli = document.createElement("li");
      newli.setAttribute('class','foods');
      newli.innerHTML = [index + 1] + ':' +  e.name;
      ingred.appendChild(newli);
    })


  }

  onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});
        fetch('https://still-lowlands-82191.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
        })
        .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://still-lowlands-82191.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.calculateIngredients(response);
      })
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
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
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FoodRecognition imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
              ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          
        }
      </div>
    );
  }
}

export default App;

