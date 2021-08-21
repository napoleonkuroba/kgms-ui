import './App.css';
import TopBar from './components/TopBar'
import DataPlace from './components/DataPlace'
import React, { Component } from 'react'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <DataPlace />
      </div>
    )
  }
}