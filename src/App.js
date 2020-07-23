import React from "react";
import "./App.css";

// styling
import Button from "react-bootstrap/Button";
//Instead of manualling makng an API call I am going to use a library which abstracts pretty much every API call I could use.
//It was developed by a Spotify engineer, hence why I'm using.

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    console.log(params);
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", artist: "", albumArt: "" },
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

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          albumArt: response.item.album.images[0].url,
        },
      });
    });
  }

  getTopTracks() {
    spotifyApi
      .getMyRecentlyPlayedTracks()
      .then((response) => console.log(response));
  }

  render() {
    this.getTopTracks();
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>{this.state.nowPlaying.name}</div>
        <div>{this.state.nowPlaying.artist}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <Button variant="primary" onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </Button>
        )}
      </div>
    );
  }
}

export default App;
