import { useContext,  } from "react";

import { TeamsFxContext } from "./Context";
import Create from "./Crud";
import { Button } from "@fluentui/react-components";





export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  
  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
    <Button >Singin</Button>
     
      <Create  />
    </div>
  );
}
