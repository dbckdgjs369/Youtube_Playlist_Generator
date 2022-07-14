import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const CreateUserProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [accessToken, setAccessToken] = useState("1");
  const [authorization_code, setAuthorization_code] = useState("");

  const changeAccessToken = (data) => {
    setAccessToken(data);
  };
  const context = {
    accessToken,
    setAccessToken,
  };
  // const UserInfo =
  //   // useMemo(
  //   //useMemo로 캐싱안하면 이 상태를 사용하는 모든 컴포넌트가 리렌더됨
  //   // () => ({
  //   {
  //     accessToken,
  //     authorization_code,
  //     setAccessToken,
  //     setAuthorization_code,
  //   };
  // // }),
  // // [accessToken, authorization_code, setAccessToken, setAuthorization_code]
  // // );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export { UserContext, CreateUserProvider };

// import React, { useContext } from "react";
// import { createContext } from "react";
// import { useReducer } from "react";

// export const UserContext = createContext();
// export const UserDispatchContext = createContext();
// const initialState = {
//   accessToken: "",
//   authorization_code: "",
// };

// export default function UserInfoContext({ children }) {
//   const [state, dispatch] = useReducer(userReducer, initialState);
//   return (
//     <UserContext.Provider value={state}>
//       <UserDispatchContext.Provider value={dispatch}>
//         {children}
//       </UserDispatchContext.Provider>
//     </UserContext.Provider>
//   );
// }

// export function useUserState() {
//   const state = useContext(UserContext);
//   if (!state) throw new Error("TodosProvider not found");
//   return state;
// }

// export function useUserDispatch() {
//   const dispatch = useContext(UserDispatchContext);
//   if (!dispatch) throw new Error("TodosProvider not found");
//   return dispatch;
// }

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ACCESSTOKEN":
//       return {
//         ...state,
//         accessToken: state.accessToken.concat(action.payload),
//       };
//     case "AUTHCODE":
//       return {
//         ...state,
//         authorization_code: state.authorization_code.concat(action.payload),
//       };
//     default:
//       return state;
//   }
// };

// export const addAccessToken = (data) => {
//   return {
//     type: "ACCESSTOKEN",
//     payload: data,
//   };
// };

// export const addAuthCode = (data) => {
//   return {
//     type: "AUTHCODE",
//     payload: data,
//   };
// };
