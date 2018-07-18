import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadingUsers } from '../actions/users'
import '../css/UserChoice.css'
import Particles from 'react-particles-js'

class UserChoice extends Component {
  state = {
    users: {}
  }

  //CALLS getUsers() FUNCTION AND SETS THE STATE AS THE RESPONSE
  componentDidMount() {
    this.props.getUsers().then(response => {
      this.setState({ users: response.users})
    })
  }

  render () {
    const { users } = this.state
    
    return (
      <div>
        <Particles 
          params={{
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 40,
                  duration: 2,
                  opacity: 8,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true
          }}
          style={{
            width: '100%',
            position: 'absolute',
            left: 0,
          }}
        />
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Pick A User
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {Object.keys(users).map(user => (
              <li className="user-dropdown" key={users[user].id}>
                <a> {users[user].name} </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

//GRABS THE USERS AS A PROP
const mapStateToProps = state => {
  return {
    users: state.users
  }
}

//GRABS THE loadingUser() FUNCTION FROM ACTIONS TO BE ABLE TO USE IN THIS COMPONENT
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(loadingUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChoice);