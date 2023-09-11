import { TableCell ,Button,Dropdown,Option,makeStyles,Input} from "@fluentui/react-components";
import { PersonRegular } from "@fluentui/react-icons";
import { DatePicker } from "@fluentui/react-datepicker-compat";

import { useState } from "react"
const useStyles = makeStyles({
    control: {
      maxWidth: "300px",
    },
  });
const RowInput=(props)=>{
const [name,setName]=useState(props?.data?.Name);
const [salary,setSalary]=useState(props?.data?.Salary);
const [department,setDepartment]=useState(props?.data?.JoiningDate);
const [isActive,setIsActive]=useState(props?.data?.IsActive)
const [joining,setJoining]=useState('');

const setDate=(str)=>{
  var date=new Date(str);
  var mon=date.getMonth();
  var day=date.getDay();
  var year=date.getFullYear();
  var joinigDateIs=[day,mon,year].join["/"]
  console.log("date is ",joinigDateIs);
  setJoining(joinigDateIs)

}
const styles = useStyles();
    // const Add= async()=>{
    //     const list=
    //     console.log(list)
     
           
    //         }
    return(<>
        <TableCell><Input type="text" className={styles.control} onChange={(e)=>setName(e.target.value)}    size="small" value={name} /></TableCell>
        
        <TableCell><Input type="number" onChange={(e)=>setSalary(e.target.value)} value={salary}/></TableCell>
        <TableCell>  <DatePicker  defaultValue={props?.data?.JoiningDate} size="small" onSelectDate={(date)=>{
            setDate(date)}}
        className={styles.control}
        placeholder="Select a date..."
        {...props}
      />
      </TableCell>
        <TableCell>
        <Dropdown className={styles.control} size="small" defaultValue={props?.data?.IsActive} onOptionSelect={(event,data)=>{setIsActive(data.optionValue)}} >
            <Option   value={true}>Yes</Option>
            <Option  value={false}>No</Option>
            </Dropdown>
        </TableCell>
        {/* <TableCell><input type="text" onChange={(e)=>setDepartment(e.target.value)} value={department}/></TableCell> */}
           <TableCell>
            <Dropdown className={styles.control} defaultValue={props?.data?.Department}  size="small" onOptionSelect={(event,data)=>{setDepartment(data.optionValue)}} >
            <Option   value="Tech">Tech</Option>
            <Option  value="HR">HR</Option>
            </Dropdown>
            </TableCell>
        
        <TableCell style={{marginLeft:"55px"}}>
            <Button appearance="primary"  onClick={() => {
             console.log(name,salary,joining,department,isActive);  
            props.CreateList({
                Name:name,
                 Salary:salary,
                 Department:department,
                 JoiningDate:joining,
                 IsActive:isActive,
                
             })
             
           }}>Save
            </Button>
         </TableCell>
       
        </>)
}
export  default RowInput