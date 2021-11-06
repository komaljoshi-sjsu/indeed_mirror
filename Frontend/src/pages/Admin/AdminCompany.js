import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const AdminCompany = (props) => {

  const [search, setSearch] = useState("");
  const [companyDtls, setCompanyDtls] = useState([]);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    getCompanyDetails();
  }, [companyDtls]);

  const getCompanyDetails = async () => {
    //const data1 = {currentPage:currentPage}
    const companyDetails = await axios("/getCompanyDetails/");
    console.log(companyDetails)
    setCompanyDtls(companyDetails.data)
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      search: e.target.value
    })
  }

  const searchkeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log('value', e.target.value);
      this.setState({ isSearch: true })
      //window.location.href=`/search?search=${e.target.value}`
    }
  }

  const cardHandler = (e) => {
    const company = document.getElementById("card").getAttribute("data-value");
    //const index = e.target.getAttribute("index")
    console.log(company)
    setClicked(true);
  }

  return (
    <div>
      <AdminNavbar />
      <TextField
        id="input-with-icon-textfield"
        placeholder="Company Name?"
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyDown={searchkeyPress}
        onChange={searchChangeHandler}
        variant="filled"
        size="small"

      />
      {/* {companyDtls} */}
        {companyDtls.map((company) => (
          <div id="card" data-value={company.companyId} onClick={cardHandler}>
            <Card style={{ width: "40%", padding: 5 }}>
              <div>
                <p>{company.companyName}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

  );
}

export default AdminCompany;