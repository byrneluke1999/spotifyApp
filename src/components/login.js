import React from "react";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
const cookies = new Cookies();

class login extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    console.log(this.state.loggedIn);
    if (this.state.loggedIn) {
      return <Redirect to="/stats" />;
    }
    return <a href="http://localhost:8888"> Login to Spotify </a>;
  }
}

export default login;
