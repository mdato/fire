import React, { Component } from "react";
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';

const App = () => {
    return (
      <div className="container">
        <div className="row">
          
          <div className="agrego">
            <Articles />
            </div>
       
            <AddArticle />
          
        </div>
      
      </div>
    );
  }

export default App
