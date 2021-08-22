import './App.css';
import TopBar from './components/TopBar'
import DataPlace from './components/DataPlace'
import React, { Component } from 'react'
import CopyRight from './components/CopyRight';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <div className="content">
        <DataPlace />
        </div>
        <CopyRight/>
      </div>
    )
  }
}