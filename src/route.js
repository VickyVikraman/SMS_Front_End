import React, { Component } from 'react';
import './App.css';
import {  Route, withRouter } from 'react-router-dom'
import Login from './Component/Login/login';
import Home from './Component/Hod/home';
import StudentHome from './Component/Student/home'
import { ACCESS_TOKEN } from './constants'
import {notification} from 'antd'
import { getCurrentUser, getCurrentStudent } from "./Service/loginService";
import Registration from './Component/Student/registration';

class Routing extends Component {

  
  state = {
    currentUser:null,
    isAuthenticated:false
  }

  handleLogout = (redirectTo="/", notificationType="success", description="You're successfully logged out.") =>{
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("role")
    this.props.history.push(redirectTo);
    
    notification[notificationType]({
      message: 'SMS',
      description: description,
    });
  }

  handleLogin = () =>{
    notification.success({
      message: "SMS",
      description: "You're successfully logged in."
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
      });
    })
    .catch(error => {

    });
  }

  handleStudentLogin = () =>{
    notification.success({
      message: "SMS",
      description: "You're successfully logged in."
    });
    getCurrentStudent()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
      });
      if(!response.newUser){
        this.props.history.push("/registration")
      }
      else{
        this.props.history.push("/student/home")
      }
    })
    .catch(error => {

    });
  }


  checkLoginOrNot = () => {
      if(localStorage.getItem("accessToken")!==null){
        if(localStorage.getItem("role")==="hod"){
          this.props.history.push("/home")
        }
        else if(localStorage.getItem("role")==="student"){
          if(!this.state.currentUser.newUser){
            this.props.history.push("/registration")  
          }
          // this.props.history.push("/student/home")
        }

      }
  }

  checkSigningIn = () =>{
    if(localStorage.getItem("accessToken")===null){
      this.props.history.push("/")
    }
    else if(localStorage.getItem("role")!=="hod"){
      
    }

  }

  checkStudentSigningIn = () => {
    if(localStorage.getItem("accessToken")===null){
      this.props.history.push("/")
    }
    else if(localStorage.getItem("role")!=="student"){

    }
    
  }

  render() {
    return (
      <div className="App">
        <Route exact path ="/"  component={()=> <Login  onLogin={this.handleLogin} onStudentLogin={this.handleStudentLogin} loginCheck={this.checkLoginOrNot}/>}/> 
        <Route exact path ="/home"  component={()=> <Home  onLogout={this.handleLogout} checkLogin={this.checkSigningIn} currentUser={this.state.currentUser} />}/> 
        <Route exact path ="/registration"  component={()=> <Registration onLogout={this.handleLogout} checkLogin={this.checkStudentSigningIn} currentUser={this.state.currentUser} />}/> 
        <Route exact path ="/student/home"  component={()=> <StudentHome onLogout={this.handleLogout} checkLogin={this.checkStudentSigningIn} currentUser={this.state.currentUser}/>}/> 
        
      </div>
   );
  }

}

export default withRouter(Routing);