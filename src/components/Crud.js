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
  const AccesToken =sessionStorage.getItem("accessToken")
  console.log("Token in crurd",AccesToken);


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
