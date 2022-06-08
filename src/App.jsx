import React, { Component } from "react";
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';

const App = () => {
    return (
      <div className="container">
        
        <div className="row">

            <div className="col-sm-6">
            <AddArticle />
            </div>
            <div className="col-sm-6">
            <Articles />
            </div>
          
        </div>
      
      </div>
    );
  }

export default App
