import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


function Navbar() {

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <h1>
          <SVG>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#FFFFFF" stroke="none">
<path d="M865 5109 c-133 -19 -319 -92 -432 -170 -26 -18 -82 -66 -124 -106
-165 -158 -270 -363 -299 -584 -8 -59 -10 -554 -7 -1654 3 -1724 -1 -1593 63
-1783 116 -347 411 -638 763 -751 180 -59 90 -56 1826 -56 1522 0 1604 1 1680
19 407 94 717 431 774 840 15 106 15 1686 0 1792 -34 244 -173 489 -363 641
-96 77 -265 162 -386 195 l-85 23 -1695 5 c-1617 5 -1698 6 -1750 24 -106 36
-173 77 -251 155 -294 294 -209 779 166 958 140 66 44 63 1826 63 1577 0 1618
0 1693 -20 112 -28 189 -73 277 -160 137 -136 179 -257 179 -521 0 -144 2
-159 23 -200 71 -135 254 -145 342 -20 30 42 30 43 33 202 4 183 -8 297 -45
413 -106 337 -368 585 -718 679 l-80 22 -1675 1 c-921 1 -1702 -2 -1735 -7z
m-288 -1895 c40 -19 114 -46 165 -61 l93 -27 1700 -6 c1612 -5 1703 -6,1755
-23,207,-69,373,-249,415,-452,22,-104,22,-1666,0,-1770,-24,-113,-77,-208
-164,-295,-88,-87,-165,-132,-277,-160,-75,-19,-116,-20,-1605,-20,-1655,0
-1594,-2,-1744,55,-204,77,-383,256,-460,460,-56,147,-55,127,-55,1310,l0
1094,53,-36,c28,-20,84,-51,124,-69z"/>
<path d="M3987,1994 c-93,-29-167,-134-167,-239 c0-129,121-245,255-245
56,0,127,31,170,75 c98,98,98,252,0,350 c-69,69-158,89-258,59z"/>
<path d="M930,4307 c-50,-16-104,-75-119,-130 c-25,-89,9,-181,86,-228 l38
-24 l1614,-3 l1614,-2 l44,21 c121,58,148,224,53,319 c-19,19-54,41-76,
48 c-56,16-3201,16-3254,-1z"/>
              </g>
            </svg>

          </SVG>
          Project Batua ~ Developed by ~ Varun
        </h1>

        {/* <div>
          <h1>Your Name</h1>
          <Login onClick={()=>{ navigate("/login") }}>Login</Login>
          <Logout onClick={()=>{ navigate("/") }}> Logout </Logout>
        </div> */}
        <Version>
      
            Version<span> 0.1</span>
          
        </Version>
        
      </Container>
    </>
  )
}


const Container = styled.div`
  padding: 16px 12px;
  width: 85%;
  margin-bottom: 10px;
  /* border-bottom: 1px solid #cecdcd7a; */
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  

  h1{
    /* font-size: 20r; */
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
  }

  div{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap:20px;

  }
`;

const SVG = styled.div`
  height: 32px;
  width: 32px;
  padding: 4px;
`;

// const Login = styled.button`
//   border: 1.8px solid rgba(114, 144, 252,1);
//   background-color: rgba(61, 102, 249,1);
//   padding: 6px 30px;
//   border-radius: 25px;

//   &:hover{
//     background-color: rgba(61, 102, 249,.5);
//   }
// `;

// const Logout = styled.button`
//   border: 1.8px solid #fc7272;
//   background-color: rgb(249, 61, 61);
//   padding: 6px 30px;
//   border-radius: 25px;

//   &:hover{
//     background-color: rgba(249, 61, 61,.5);
//   }
// `;

const Version = styled.div`
 
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border: 2px solid white; */

  span{
    height: 100%;
    width: 40px;
    border: 1px solid white;
    border-radius: 12px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 16px;
  }
`;

export default Navbar
