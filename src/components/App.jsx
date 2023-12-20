// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import LogIn from "./Login";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint,
    clientId: config.clientId,

  });
  const [finalToken,setFinalToken] = useState('');
  console.log("Try ssoToken",teamsUserCredential);

  useEffect(() => {
    loading &&
    app.initialize().then(async () => {

      const authConfig = {

          clientId: config.clientId,

          initiateLoginEndpoint: config.initiateLoginEndpoint,

      };

      const credential = new TeamsUserCredential(authConfig);

      const token = await credential.getToken(["User.Read"]);
      sessionStorage.setItem("accesstoken",token.token)

      console.log("TOKEN------------->", token.token);
      setFinalToken(token.token)
      sessionStorage.setItem("accessToken",token.token)
      // Hide the loading indicator.

      app.notifySuccess();

  });
  }, [loading]);
  console.log("Tokens Outside the useaffect loadonf in app jsx",finalToken)
  return (<><div>
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {!loading && (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab />} />
              <Route path="/config" element={<TabConfig />} />
              <Route path="/login" element={<LogIn/>} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
    </div>
    </>
    
  );
}
// https://fluentsite.z22.web.core.windows.net/quick-start
// import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
// import { HashRouter as Router, Redirect, Route } from "react-router-dom";
// import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
// import Privacy from "./Privacy";
// import TermsOfUse from "./TermsOfUse";
// import Tab from "./Tab";
// import "./App.css";
// import TabConfig from "./TabConfig";
// import { TeamsFxContext } from "./Context";
// import config from "./sample/lib/config";
// import { useEffect, useState } from "react";

// /**
//  * The main app which handles the initialization and routing
//  * of the app.
//  */
// export default function App() {
//   const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
//     initiateLoginEndpoint: config.initiateLoginEndpoint!,
//     clientId: config.clientId!,
//   });
//     const [token, settoken] = useState('');

//   useEffect(() => {
//     (async () => {
//       if(teamsUserCredential) {
//         try {
//           const test = await teamsUserCredential.getToken(["User.Read"]);
//           settoken(test?.token??'');
//         } catch (error) {
//           settoken(JSON.stringify(error));
//         }
//       }
//     })();
//   }, [teamsUserCredential])
//   return (
//     <TeamsFxContext.Provider value={{theme, themeString, teamsUserCredential}}>
//       <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
//         <Router>
//           <Route exact path="/">
//             <Redirect to="/tab" />
//           </Route>
//           {loading ? (
//             <Loader style={{ margin: 100 }} />
//           ) : (
//             <>
//             <h1>{token}</h1>
//               <Route exact path="/privacy" component={Privacy} />
//               <Route exact path="/termsofuse" component={TermsOfUse} />
//               <Route exact path="/tab" component={Tab} />
//               <Route exact path="/config" component={TabConfig} />
//             </>
//           )}
//         </Router>
//       </Provider>
//       </TeamsFxContext.Provider>
//   );
// }
