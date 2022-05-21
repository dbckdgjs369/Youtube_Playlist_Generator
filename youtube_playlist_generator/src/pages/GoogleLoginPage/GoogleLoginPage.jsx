import axios from "axios";
import React from "react";
import GoogleLogin from "react-google-login";
export default function GoogleLoginPage() {
  const responseGoogleS = (res) => {
    console.log("success!");
  };
  const responseGoogleF = (res) => {
    console.log("fail!");
  };
  const REDIRECT_URI = "http://localhost:3000/auth";
  console.log(window.location.href);
  //   const authorization_code = window.location.href.split("code=")[1];
  const authorization_code = new URLSearchParams(window.location.search).get(
    "code"
  );
  console.log(authorization_code);
  //   console.log(authorization_code);
  //   function getAccessToken() {
  //     axios.post(
  //       `https://oauth2.googleapis.com/token?code=authorization code&clientid=${process.env.REACT_APP_CLIENT_ID}&clientsecret=${process.env.REACT_APP_CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`
  //     );
  //   }
  //   async function getAccessToken() {
  //     const accessToken = axios.post(
  //       "https://oauth2.googleapis.com/token?code=4/0AX4XfWg4xlJ-qMC23LMiqOg3IfKG0oUwzIzNT8JQsfRk7Gjzq-Q1ujkvj1vebdkgKkiR-g&client_id=493818267644-tvd48frdulktave72ghccfvimav2sk26.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:3000/auth&grant_type=authorization_code"
  //       //   `https://oauth2.googleapis.com/token?code=${authorization_code}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=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&redirect_uri=http://localhost:3000/auth&grant_type=authorization_code`
  //       // "https://oauth2.googleapis.com/token?code=4/0AX4XfWg4xlJ-qMC23LMiqOg3IfKG0oUwzIzNT8JQsfRk7Gjzq-Q1ujkvj1vebdkgKkiR-g&client_id=493818267644-tvd48frdulktave72ghccfvimav2sk26.apps.googleusercontent.com&client_secret=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&redirect_uri=http://localhost:3000/auth&grant_type=authorization_code",
  //       //                              "/token?code=4/0AX4XfWg4xlJ-qMC23LMiqOg3IfKG0oUwzIzNT8JQsfRk7Gjzq-Q1ujkvj1vebdkgKkiR-g&client_id=493818267644-tvd48frdulktave72ghccfvimav2sk26.apps.googleusercontent.com&client_secret=undefined&redirect_uri=http://localhost:3000/auth&grant_type=authorization_code"
  //     );

  // console.log(await accessToken);
  //   }
  //   getAccessToken();?
  async function getAccessToken() {
    const accessToken = axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: authorization_code,
      grant_type: "authorization_code",
    });
    console.log(await accessToken);
  }
  return (
    // <GoogleLogin
    //   clientId={process.env.REACT_APP_CLIENT_ID}
    //   buttonText="구글로 계속하기"
    //   onSuccess={responseGoogleS} //성공시 실행되는 함수
    //   onFailure={responseGoogleF} //실패했을 때 실행되는 함수
    // />
    <div>
      {authorization_code}
      <button onClick={getAccessToken}>get</button>
    </div>
  );
}
