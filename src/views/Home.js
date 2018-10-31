import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { Col } from 'react-bootstrap';

const imagesLoadedOptions = { background: '.my-bg-image-el' }
const masonryOptions = {
    transitionDuration: 0
};

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.fetchData(0);
    this.state = {
        images: [

        ]
    };
  }
  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  trackScrolling = () => {
    const wrappedElement = document.getElementById('App');
    if (this.isBottom.bind(this,wrappedElement)) {
      alert('header bottom reached');
      document.removeEventListener('scroll', this.trackScrolling.bind(this));
    }
  };
  fetchData(index){
    let _this = this;
    var instance = axios.create({
      baseURL: "https://contextualwebsearch-websearch-v1.p.mashape.com/api",
      timeout: 1000,
      headers: {
        'X-Mashape-Key': 'm7vyuhii1temrltv72vbrzypa6sroz',
        'X-Mashape-Host' : 'contextualwebsearch-websearch-v1.p.mashape.com'
      }
    });
    instance.get('/Search/ImageSearchAPI', {
        params: {
          count: 50,
          q: 'succulent',
          autoCorrect: false,
          pageNumber: index,
          pageSize: 10
        }
      })
      .then(function (response) {
        if(response.data && response.data._type && response.data.value && response.data.value.length > 0){
          _this.setState({
            images: response.data.value
          })
          console.log('state is: ', _this.state)
        }else{
          alert("error retrieving results")
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  render() {
    const childElements = this.state.images.map(function(element){
         return (
              <Col xs={6} md={4} >
                  <img src={element.url} />
              </Col>
          );
      });
    return (
      <div className="App" id="App">
        <Masonry
            className={'my-gallery-class'} // default ''
            elementType={'span'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            imagesLoadedOptions={imagesLoadedOptions} // default {}
        >
            {childElements}
        </Masonry>
      </div>
    )
  }
}

export const Home = HomeContainer
