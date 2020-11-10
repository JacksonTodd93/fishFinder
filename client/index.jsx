import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import $ from 'jquery';

import FishGrid from './FishGrid.jsx';
import SignInForm from './SignInForm.jsx';
import DisplayMessage from './DisplayMessage.jsx';

const Background = styled.div`
background-color: rgb(157, 255, 176)
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'default',
      targetFish: {},
      allFish: [],
      allUsers: [],
      nextAvailable: {},
      hemisphere: 'northern',
      authenticated: false,
    }
  }

  findTargetFish(fishArray) {
    const targetFish = [];
    const rightNow = new Date();
    const month = rightNow.getMonth();
    let available;
    let notCaught;
    let hour = rightNow.getHours();
    for (let i = 0; i < fishArray.length; i += 1) {
      if (fishArray[i].hours[hour] === 'y' && fishArray[i].months[month] === 'y') {
        available = true;
      } else {
        available = false;
      }
      if (fishArray[i].obtained === 0) {
        notCaught = true;
      } else {
        notCaught = false;
      }
      if (available && notCaught) {
        this.setState({
          targetFish: fishArray[i]
        });
        return;
      }
    }
    this.findNextAvailable(fishArray);
  }


  findNextAvailable(fishArray, userData) {
    this.setState({
      targetFish: []
    })
    let nextAvailable = {
      fishObj: {},
      timeToWait: {
        months: Infinity,
        hours: Infinity
      }
    };
    const rightNow = new Date();
    const month = rightNow.getMonth();
    const hours = rightNow.getHours();
    for (var i = 0; i < fishArray.length; i += 1) {
      if (fishArray[i].obtained === 0) {
        let iterMonth = month;
        let monthCount = 0;
        while (fishArray[i].months[iterMonth] !== 'y') {
          if (iterMonth === fishArray[i].months.length - 1) {
            iterMonth = 0;
            monthCount += 1;
          } else {
            iterMonth += 1;
            monthCount += 1;
          }
        }

        let iterHours = hours;
        let hourCount = 0;
        while (fishArray[i].hours[iterHours] !== 'y') {
          if (iterHours === fishArray[i].hours.length - 1) {
            iterHours = 0;
            hourCount += 1;
          } else {
            iterHours += 1;
            hourCount += 1;
          }
        }
        if (monthCount < nextAvailable.timeToWait.months) {
          nextAvailable.fishObj = fishArray[i];
          nextAvailable.timeToWait.months = monthCount;
          if (hourCount < nextAvailable.timeToWait.hours) {
            nextAvailable.timeToWait.hours = hourCount;
          }
        }
      }
    }
    this.setState({
      nextAvailable: nextAvailable,
      targetFish: {}
    })
  }

  updateFishEntry(idNumber) {
    const options = {
      method: 'put',
      url: `/api/users/${idNumber}`,
      data: {
        name: this.state.name
      },
      failure: () => {
        console.log('Update failed');
      },
      complete: () => {
        this.fetchUser(this.state.name);
      }
    }
    $.ajax(options);
  }

  login(username) {
    const options = {
      method: 'get',
      url: '/api/users',
      failure: () => {
        console.log('Get request failed');
      },
      complete: (res) => {
        let fishArray = this.state.allFish;
        for (var i = 0; i < fishArray.length; i += 1) {
          let idTag = `fish${i + 1}`;
          fishArray[i].obtained = res.responseJSON.user[idTag];
        }
        this.setState({
          allFish: fishArray,
          name: username
        })
        this.findTargetFish(this.state.allFish);
      },
      data: {
        name: username
      }
    }
    $.ajax(options);
  }

  fetchAllUsers() {
    const options = {
      method: 'get',
      url: '/api/allusers',
      failure: () => {
        console.log('Get request failed');
      },
      complete: (res) => {
        this.setState({
          allUsers: res.responseJSON
        })
      }
    }
    $.ajax(options);
  }

  fetchFish() {
    const options = {
      method: 'get',
      url: `/api/fish`,
      failure: () => {
        console.log('Get request failed');
      },
      complete: (res) => {
        this.setState({
          allFish: res.responseJSON
        })
      }
    };
    $.ajax(options);
  }

  createNewUser(newName, pw) {
    const options = {
      method: 'post',
      url: '/signup',
      data: {
        name: newName,
        password: pw,
      },
      failure: () => {
        console.log('Account not created');
      },
      complete: () => {
        this.fetchAllUsers();
      }
    }
    $.ajax(options);
  }

  componentDidMount() {
    // this.fetchFish();
  }



  render() {
    if (this.state.authenticated) {
      return (
        <Background>
          <div>
          </div>
          <div>
            <DisplayMessage
              targetFish={this.state.targetFish}
              nextAvailable={this.state.nextAvailable}
            ></DisplayMessage>
          </div>
          <div>
            <FishGrid updateFishEntry={this.updateFishEntry.bind(this)} fishArray={this.state.allFish}>

            </FishGrid>
          </div>
        </Background>)
    }
    return <SignInForm createNewUser={this.createNewUser.bind(this)}> </SignInForm>
  }
}

ReactDOM.render(<App />, document.getElementById('fishfinder'));