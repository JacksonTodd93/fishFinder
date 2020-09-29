import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
position: relative;
display: flex;
flex-wrap: wrap;
width: 65vw;
`;

const ObtainedFish = styled.div`
position: relative;
width: 200px;
height: 64px;
padding-top: 20px;
border: 2px solid black;
background-color: rgb(129, 241, 247);
text-align: center;
margin: 2px;
font-weight: bold;
border-radius: 5px;
color: navy;
`;

const UnobtainedFish = styled.div`
position: relative;
width: 200px;
height: 64px;
padding-top: 20px;
border: 2px solid black;
background-color: darkgray;
text-align: center;
border-radius: 5px;
font-weight: bold;
margin: 2px;
color: white;
`;

const FishImage = styled.img`
position: absolute;
left: 0;
`;

const TextWrapper = styled.span`
position: absolute;
top: 50%;
left: 64px;
width: 100px;
`;

const FishGrid = function (props) {
  return (
    <Flex>
      {props.fishArray.map((fish, i) => {
        const imgUrl = `https://acnhfishimages.s3.us-east-2.amazonaws.com/${fish.id}.png`;
        if (fish.obtained === 1) {
          return <ObtainedFish key={i} onClick={() => { props.updateFishEntry(fish.id) }}><FishImage src={imgUrl}></FishImage><TextWrapper>{fish.name}</TextWrapper></ObtainedFish>
        } else {
          return <UnobtainedFish key={i} onClick={() => { props.updateFishEntry(fish.id) }} ><FishImage src={imgUrl}></FishImage><TextWrapper>{fish.name}</TextWrapper></UnobtainedFish>
        }
      })}
    </Flex>
  )
}

export default FishGrid;
