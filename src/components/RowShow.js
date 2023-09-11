import { TableCell, } from "@fluentui/react-components"
// import { Button } from "@fluentui/react-components";
import axios from "axios"

import {
  Delete24Regular,
  Edit24Filled,
 
} from "@fluentui/react-icons"
import {
    PersonDelete24Filled,
    CheckmarkUnderlineCircle20Filled,
  } from "@fluentui/react-icons";
import { useState } from "react";
import RowInput from "./RowInput";
const RowShow=({index,data,DeleteData,AccesToken,url})=>{
    console.log(data);
    const  [showInput,setShowInput]=useState(false)
    
    const setEdit=(id)=>{
        
        setShowInput(true)
    }
    const update=async (list)=>{
     
      console.log(`${url}/${data.id},${list}`)
      try {
        console.log("In updte f/n");
        console.log(data);
        await axios
        .patch(`${url}/${data.id}/fields`, 
            {...list },
          { headers: { Authorization: `Bearer ${AccesToken }`} })

        
      } catch (error) {
        console.log(error)
        
      }
      window.location.reload();
      
      
    }
    return (
    <>
        {showInput ? <RowInput CreateList={update} data={data} />:<>
        <TableCell>{data.Name} </TableCell> 
        <TableCell>{data.Salary}</TableCell>
        <TableCell>{data.JoiningDate}</TableCell>
        <TableCell>{data.IsActive ? (<CheckmarkUnderlineCircle20Filled  /> ) : (
                        <PersonDelete24Filled />
                      )}
                    </TableCell>
        <TableCell>{data.Department}</TableCell>
                    <TableCell>
                    <Edit24Filled  onClick={setEdit} style={{ marginRight: "20px" }}  />
                    <Delete24Regular appearance="primary"
                     onClick={() => {
                        DeleteData(data.id);
                      }} ></Delete24Regular>
                    </TableCell>
                    </>}
        
                    
                    
                   
        
        </>)
    

}
export default RowShow