import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const particlesOption = {
  particles: {
    namber: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

const app = new Clarifai.App({apiKey: 'f58996d1a23b425c9eb4a3b2f0711c38'});

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState( {
      box: box
    })
  }

  oninputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    })

    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input )
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err) );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={{
              particles: {particlesOption}
              }
          } />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
            onInputChange={this.oninputChange}
            onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition 
            imageUrl={this.state.imageUrl}
            box={this.state.box} /> 
      </div>
    );
  }
}

export default App;
