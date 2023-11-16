import logo from './logo.svg';
import './App.css';
import React,{ useState, useEffect } from 'react';
import {Route,Routes,NavLink} from "react-router-dom";
import Main from "./pages/Main";
import New from "./pages/New";
import Report from "./pages/Report";
import Workshops from "./pages/Feedback";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import { GoogleLogin,googleLogout, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "./components/store";
import ReactGA from 'react-ga';

ReactGA.initialize('G-TWCHF5DQZ7');

function App() {
  //const [ profile, setProfile ] = useState({});
  const [ user, setUser ] = useState(null);
  const [error, setError] = useState("");
  const profile = useSelector((state) => state.theStore.value);
  const dispatch = useDispatch();
  ///////
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log('login.success',response);
      setUser(response);

    //let decoded = jwt_decode(response.credential);
    //console.log('decoded',decoded);
    ////////setProfile({'name': decoded.name, 'email':decoded.email});
    /*try {
      //let res = await fetch('http://localhost:9096/api/user', {
        let res = await fetch('http://k8s-default-awsingre-23c3bc0850-121321573.us-east-2.elb.amazonaws.com/userapp/user', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 
        JSON.stringify({
          'email': decoded.email,
          'name': decoded.name
      }) 
      });
      let resJson = await res.json();
      if (res.status === 200) {
        //setMessage(null);
        console.log('userid',resJson);
        let userId=resJson;
        //xxxsetProfile({'id': userId, 'name': decoded.name, 'email':decoded.email});
        //set as global variable in redux
        dispatch(getProfile({'id': userId, 'name': decoded.name, 'email':decoded.email}));
        console.log('global profile',profile);
      } else {
        //setMessage("Some error occured");
        setError("Some error occured, please try again later.");
      }
    } catch (err) {
      console.log(err);
      setError("Some error occured, please try again later.");
      //setMessage("Some error occured");
    }*/
    },
    onError: codeResponse => setError("Some error occured, please try again later."),
    flow: 'implicit'
  });

  useEffect(
    async () => {
        if (user) {
            
         //////////////////////////////////////////////////////////////////////////////
         try {
          //let res = await fetch('http://localhost:9096/api/user', {
            let response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {  
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
          let resJson = await response.json();
          if (response.status === 200) {
            //setMessage(null);
            console.log('userprofile',resJson);
            let userId=resJson;
            //xxxsetProfile({'id': userId, 'name': decoded.name, 'email':decoded.email});
            //set as global variable in redux
            dispatch(getProfile({'id': userId, 'name': '', 'email':''}));
            console.log('global profile',profile);
          } else {
            //setMessage("Some error occured");
            setError("Some error occured, please try again later.");
          }
        } catch (err) {
          console.log(err);
          setError("Some error occured, please try again later.");
          //setMessage("Some error occured");
        }       
        }
    },
    [ user ]
);

  const responseMessage = async (response) => {
    
    //copy above onSUCCESS here
  };
  const errorMessage = (error) => {
      console.log('login.failure',error);
      setError("Some error occured, please try again later.");
  };
  ///////

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        //setProfile({});
    };
    useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
  return (
    
    <>
    {profile.id ? (<div className='app'>
      <Header/>
        <Routes>
            <Route exact path="/" element={<Main/>}/>
            <Route path="/feedback" element={<Workshops/>}/>
            <Route path="/report" element={<Report/>}/>
            <Route path="/new" element={<New/>}/>
        </Routes>
        <Footer/>
        </div>):
        <div className='login-form'>
          <h6 className='login-header'>Login to the Peaceful Mind App</h6>
          
          <button className="login-button" onClick={() => login()}>
            Sign in with Google 🚀{' '}
          </button>;
          <p className='login-error'>{error}</p>
         </div>
         }
    </>
  );
}

export default App;
