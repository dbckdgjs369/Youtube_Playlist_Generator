import "./style.scss";

const API_END_POINT = "https://accounts.google.com/o/oauth2/auth";
const REDIRECT_URI = "http://localhost:3000/create";
const SCOPE = "https://www.googleapis.com/auth/youtube";
const url = `${API_END_POINT}?access_type=offline&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

console.log(url);
export default function LoginPage() {
  return (
    <div className="Wrapper">
      <h1>Welcome to YouTube Playlist Generator!!</h1>
      <h2>Log in to the account you want to create a playlist for </h2>

      <button className="LoginBtn">
        <a href={url}>Login </a>
      </button>
    </div>
  );
}
