import React from "react";
import "./App.css";

// styling
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

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
      user: { name: "" },
      nowPlaying: { name: "Not Checked", artist: "", albumArt: "" },
      topTracks: [],
      topArtists: [],
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
      if (response === "") {
        this.setState({
          nowPlaying: {
            name: "You're not listening to anything right now",
          },
        });
      } else {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: response.item.artists[0].name,
            albumArt: response.item.album.images[0].url,
          },
        });
      }
    });
  }

  getTopTracks() {
    spotifyApi
      .getMyTopTracks()
      .then((response) => this.setState({ topTracks: response.items }));
  }

  getTopArtists() {
    spotifyApi
      .getMyTopArtists()
      .then((response) => this.setState({ topArtists: response.items }));
  }

  getUserDetails() {
    spotifyApi.getMe().then((response) =>
      this.setState({
        user: {
          name: response.display_name,
        },
      })
    );
  }

  render() {
    this.getUserDetails();
    let userNav;
    if (this.state.loggedIn) {
      userNav = (
        <Nav.Item className="mr-auto" style={{ color: "#ee6c4d" }}>
          Signed in as: {this.state.user.name}
        </Nav.Item>
      );
    } else {
      userNav = (
        <Nav.Link
          href="http://localhost:8888"
          className="mr-auto"
          style={{ color: "#ee6c4d" }}
        >
          Login to Spotify
        </Nav.Link>
      );
    }
    return (
      <div className="App">
        <Navbar collapseOnSelect bg="dark" variant="dark">
          <Navbar.Brand href="#home" style={{ color: "#ee6c4d" }}>
            SpotifyStats
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
            </Nav>
            <Nav>{userNav}</Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>{this.state.nowPlaying.name}</div>
        <div>{this.state.nowPlaying.artist}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        <CardGroup>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="bottom" />
            <Card.Body>
              <Card.Title>Your Top Tracks</Card.Title>
              <Card.Text>The last 6 months</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {this.state.topTracks.map((track) => (
                <ListGroup.Item as="li" key={track.id}>
                  {track.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Your Top Artists</Card.Title>
              <Card.Text>The last 6 months</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {this.state.topArtists.map((artist) => (
                <ListGroup.Item as="li" key={artist.id}>
                  {artist.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </CardGroup>
        {this.state.loggedIn && (
          <Button
            variant="primary"
            onClick={() => {
              this.getTopTracks();
              this.getNowPlaying();
              this.getTopArtists();
            }}
          >
            What's Happening?
          </Button>
        )}
      </div>
    );
  }
}

export default App;
