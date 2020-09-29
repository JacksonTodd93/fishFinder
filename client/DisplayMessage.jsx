import React from 'react';
import styled from 'styled-components';

const MessageBox = styled.div`
position: fixed;
right: 5%;
top: 0%;
width: 25vw;
height: 200px;
border: 2px solid rgb(255,248,229);
border-radius: 5px;
background-color: rgb(255, 248, 229);
color: rgb(125, 115, 91);
font-family: "Tahoma, Geneva, sans-serif";
`;

const TextWrapper = styled.span`
font-weight: bold;
position: absolute;
width: 100%;
margin: 1px;
top: 25%;
`;

const DisplayMessage = function (props) {
  if (props.targetFish && props.targetFish.name) {
    if (props.targetFish.name === 'Coelacanth') {
      return (
        <MessageBox> <TextWrapper>You can add {props.targetFish.name} to your collection right now, if it is raining. It is available in the {props.targetFish.location}
        </TextWrapper></MessageBox>
      )
    }
    return (
      <MessageBox> <TextWrapper>You can add {props.targetFish.name} to your collection right now! It is available in the {props.targetFish.location}
     </TextWrapper> </MessageBox>
    )
  } else if (props.nextAvailable.fishObj && props.nextAvailable.fishObj.name) {
    const times = props.nextAvailable.timeToWait;
    const fish = props.nextAvailable.fishObj;
    const rightNow = new Date();
    const currentHour = rightNow.getHours();
    const currentMonth = rightNow.getMonth();
    if (times.months === 0) {
      let hour = currentHour;
      while (fish.hours[hour] !== 'y') {
        if (hour === 23) {
          hour = 0;
        } else {
          hour += 1;
        }
      }
      let time = '';
      if (hour === 0) {
        time = '12 A.M.';
      } else if (hour === 12) {
        time = '12 P.M.'
      } else if (hour < 12) {
        time = `${hour} A.M.`;
      } else {
        time = `${hour - 12} P.M.`
      }
      return (
        <MessageBox> <TextWrapper>
          The next fish that will be available to add to your collection is {fish.name}. It will be available at {time}, and can be found in the {fish.location}.
          </TextWrapper></MessageBox>
      )
    } else {
      let month = currentMonth;
      while (fish.months[month] !== 'y') {
        if (month === 11) {
          month = 0;
        } else {
          month += 1;
        }
      }
      const monthTable = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
      return (
        <MessageBox> <TextWrapper>
          The next fish that will be available to add to your collection is {fish.name}. It will be available in {monthTable[month]}, and is located in the {fish.location}.
          </TextWrapper> </MessageBox>
      )
    }
  } else {
    return (
      <MessageBox><TextWrapper>Congratulations! You have collected all the fish in the game.</TextWrapper></MessageBox>
    )
  }
}

export default DisplayMessage;