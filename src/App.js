import React from 'react'
import {useState} from "react"
import "./App.css"
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'

export default function App(){
 const apiKey = process.env.REACT_APP_NEWS_API
 const pageSize = 5
 const [progress,setProgress] = useState(0)
    return (
      <div>
      <Router>
      <LoadingBar 
        color='#f11946'
        progress={progress}
        height={3}
      />
        <Navbar/>
        <Switch>
        <Route exact path ="/">
        <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>
        </Route>
        <Route exact path="/business">
        <News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country="in" category="business"/>
        </Route>
        <Route exact path="/entertainment">
        <News setProgress={setProgress}  apiKey={apiKey}key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>
        </Route>
        <Route exact path="/health">
        <News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="in" category="health"/>
        </Route>
        <Route exact path="/science">
        <News setProgress={setProgress}  apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>
        </Route>
        <Route exact path="/sports">
        <News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="in" category="sports"/>
        </Route>
        <Route exact path="/technology">
        <News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="in" category="technology"/>
        </Route>
      </Switch>
      </Router>
      </div>
    )
}

