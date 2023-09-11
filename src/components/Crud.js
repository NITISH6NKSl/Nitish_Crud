import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import axios from "axios";
import RowShow from "./RowShow";
import RowInput from "./RowInput";
import { SearchBox } from "@fluentui/react-search-preview";

import { makeStyles, Button, } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons"

import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
} from "@fluentui/react-components";
const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
});

const Create = () => {
  const [data, setData] = useState([]);
  const [lenData, setLengthData] = useState(0);
  const [dataValue, setDataValue] = useState();
  const AccesToken ="eyJ0eXAiOiJKV1QiLCJub25jZSI6IktPN29hSDA4RkRQN0pBZlpRR3ZNTnlaemJmQ2pOVkpkS3c1X0JsVXR6bzgiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NzE2NWQxNy0wZmRiLTRmMmEtYTU2Ny0xMTY3ODNmYWUzYTUvIiwiaWF0IjoxNjk0MzcxMDExLCJuYmYiOjE2OTQzNzEwMTEsImV4cCI6MTY5NDQ1NzcxMSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhVQUFBQXk3TWhlNU94aWlFTldUMmd0cUVic2tMMlZKTzI3VVliNGVBUTJwdTIwMDFWbkZEUWFHeXVLY1lBTnRyYi9GUlIiLCJhbXIiOlsicHdkIiwicnNhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJkZXZpY2VpZCI6ImIwNWRjMGE2LTc3ZTgtNGRlYS1hZjdhLTE5OGQ4YzJiM2NmOSIsImZhbWlseV9uYW1lIjoiS3VtYXIiLCJnaXZlbl9uYW1lIjoiTml0aXNoIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjQwMTo0OTAwOjFjYTI6NDQ3ZToxOTY3OmI2Y2Q6NjlmNTo1NGE5IiwibmFtZSI6Ik5pdGlzaCBLdW1hciIsIm9pZCI6IjcyYzQyOWVjLWQ3ODEtNDIwOC04ODg5LTRlZjc3NDg5YzQ1YyIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMkQyRTVGN0Y2IiwicmgiOiIwLkFVb0FGMTBXUjlzUEtrLWxaeEZuZ19yanBRTUFBQUFBQUFBQXdBQUFBQUFBQUFDSkFJby4iLCJzY3AiOiJBY2Nlc3NSZXZpZXcuUmVhZC5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5BbGwgQWNjZXNzUmV2aWV3LlJlYWRXcml0ZS5NZW1iZXJzaGlwIEFQSUNvbm5lY3RvcnMuUmVhZC5BbGwgQVBJQ29ubmVjdG9ycy5SZWFkV3JpdGUuQWxsIENoYW5uZWxNZXNzYWdlLlNlbmQgQ2hhdE1lc3NhZ2UuU2VuZCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkLkFsbCBEZXZpY2VNYW5hZ2VtZW50QXBwcy5SZWFkV3JpdGUuQWxsIE1haWwuU2VuZCBNYWlsYm94U2V0dGluZ3MuUmVhZCBNYWlsYm94U2V0dGluZ3MuUmVhZFdyaXRlIG9wZW5pZCBwcm9maWxlIFNpdGVzLlJlYWQuQWxsIFNpdGVzLlJlYWRXcml0ZS5BbGwgVXNlci5JbnZpdGUuQWxsIFVzZXIuUmVhZCBVc2VyLlJlYWRXcml0ZS5BbGwgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJmTks0QmMtNjh0Q2hPdGQ5THJCS2VBSEhFOWQyOXNOUGltQi02Ry0zYjlzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiNDcxNjVkMTctMGZkYi00ZjJhLWE1NjctMTE2NzgzZmFlM2E1IiwidW5pcXVlX25hbWUiOiJOaXRpc2guS0B5Z3IxMS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJOaXRpc2guS0B5Z3IxMS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJoS0hwVmdxVkdVeUtYaUwyaGdFVkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2OTA5MTI0Ni0yMGU4LTRhNTYtYWE0ZC0wNjYwNzViMmE3YTgiLCI5Yjg5NWQ5Mi0yY2QzLTQ0YzctOWQwMi1hNmFjMmQ1ZWE1YzMiLCJmMjhhMWY1MC1mNmU3LTQ1NzEtODE4Yi02YTEyZjJhZjZiNmMiLCI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2NjIjpbIkNQMSJdLCJ4bXNfc3NtIjoiMSIsInhtc19zdCI6eyJzdWIiOiJkQUhUWUdSX1BkSFhfRnRldzMtR3hGOVVPSWg5MVdFcDAwcXJ3QUNYQXBzIn0sInhtc190Y2R0IjoxNjc0ODU1MzI1fQ.lZLYQ4iTAL7OYwbYIvJkv6hh5bRE3sQ5JzQ66Jkxn3or3SWfhRokGksNSDqikHzm-JLoQla_xYob0kDUMf2hu-CVIBJ7lbgab5riZ7FkhPiPVkH9mDgw7zkoqy8pFUNgxnVPND11A0lRio4GCKGM7ePssX_uRxW61g8s8BpXQbY0XmhM5P-IsAlR03fkB691iQ4pScqtfSJdPopXH3sE-owa0T8iXPrHliMo_VQf_Qmvvg_JKjXK8PUwN19SDkGwuamyXW2U4rh3lpHCji-59aSuhjaCELuXJ1-GP78nm0WvNyCz6xH5TqOWu7y4OrRB4xUx3jgSXevMCvoLPVa5DA";


  const styles = useStyles();
  const updateUrl =
    "https://graph.microsoft.com/v1.0/sites/c5fa4bd2-2e58-4052-a66c-48590bf3ab3d/lists/Employee/items";
  const url =
    "https://graph.microsoft.com/v1.0/sites/c5fa4bd2-2e58-4052-a66c-48590bf3ab3d/lists/Employee/items?expand=fields";
  const getData = async () => {
    await axios
      .get(url, { headers: { Authorization: AccesToken } })
      .then((Response) => {
        console.log(Response);
        setData(Response.data);
        setDataValue(Response.data.value);
        setLengthData(Response.data.value.length);
      });
  };
  const [todoList, setToDoList] = useState(2);
  const [currentToDo, setCurrentToDo] = useState(1);
  const totalPages = Math.ceil(lenData / todoList);
  console.log("Total data", lenData);
  const [visibleTodoList, setVisbleList] = useState();
  const Pagination = () => {
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    console.log(pages);
    console.log(dataValue);
    const lastindex = currentToDo * todoList;
    const firstIndex = lastindex - todoList;
    console.log("paging avlue", currentToDo, lastindex, firstIndex);
    setVisbleList(dataValue?.slice(firstIndex, lastindex));
  };

  useEffect(() => {
    Pagination();
  }, [data, currentToDo]);
  const prevHandle = () => {
    if (currentToDo !== 1) {
      setCurrentToDo(currentToDo - 1);
    }
  };
  const nextHandle = () => {
    if (currentToDo !== totalPages) {
      setCurrentToDo(currentToDo + 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { themeString } = useContext(TeamsFxContext);
  const column = [
    { columnKey: "name", label: "Name" },
    { columnKey: "salary", label: "Salary" },
    { columnKey: "joining", label: "JoiningDate" },
    { columnKey: "isActive", label: "IsActive" },
    { columnKey: "department", label: "Department" },
  ];
  const [query, setQuery] = useState("");
  const search = (data) => {
    if (query === "") {
      return data;
    } else {
      return data.filter((item) =>
        item.fields.Name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const [isShow, setShow] = useState(false);
  const createList = () => {
    setShow(true);
  };
  const CreateList = async (list) => {
    try {
      console.log(list);

      await axios.post(
        updateUrl,
        { fields: { ...list } },
        { headers: { Authorization: `Bearer ${AccesToken}` } }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  async function DeleteData(e) {
    try {
      await axios.delete(`${updateUrl}/${e}`, {
        headers: { Authorization: AccesToken },
      });
      window.location.reload();
    } catch (error) {
      console.log("Error in Delete ", error);
    }
  }

  return (
    <>
      <div
        className={
          themeString === "default"
            ? "light"
            : themeString === "dark"
            ? "dark"
            : "contrast"
        }
      >
      
        <h1 style={{ paddingTop: "15px" }}>Share point List</h1>

        <div
          className="searchBox"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <SearchBox
            placeholder="Search...."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          ></SearchBox>
        </div>

        <div className={styles.wrapper}>
          <Button
            style={{ float: "left" }}
            onClick={createList}
            appearance="primary"
          >
            <Add24Regular style={{ marginRight: "10px" }} />
            New List
          </Button>
        </div>
        <div className="parentTableFooter" style={{    height: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
      }}>
        <div className="table">
          <Table arial-label="Default table">
            <TableHeader>
              <TableRow>
                {column?.map((val, index) => {
                  return (
                    <TableHeaderCell key={val.columnKey}>
                      {val.label}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {query === "" ? (
                <>
                  {(visibleTodoList)?.map((item) => {
                    return (
                      <>
                        <TableRow>
                          <RowShow
                            url={updateUrl}
                            AccesToken={AccesToken}
                            key={item.fields.id}
                            data={item.fields}
                            DeleteData={DeleteData}
                          />
                        </TableRow>
                      </>
                    );
                  })}
                  
                </>
              ) : (
                search(dataValue)?.map((item) => {
                  return (
                    <TableRow>
                      <RowShow
                        url={updateUrl}
                        AccesToken={AccesToken}
                        key={item.fields.id}
                        data={item.fields}
                        DeleteData={DeleteData}
                      />
                    </TableRow>
                  );
                })
              )}
              {isShow && (
                
                  <TableRow>
                    <RowInput  CreateList={CreateList} />
                  </TableRow>
                
              )}
            </TableBody>
          </Table>
          </div>
          {(query==="")&&( <div className="pageHandle" style={{display:"flex",justifyContent:"space-evenly"}}>
                  
          <Button onClick={prevHandle} appearance="primary">
            Prev
          </Button>
        
          <Button onClick={nextHandle} appearance="primary">
            Next
          </Button>
     </div> )} 
              
               
     </div>
      </div>
    </>
  );
};
export default Create;
