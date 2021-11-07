import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Pagination from "./../JobSeeker/Pagination";

const AdminCompany = (props) => {

  const [search, setSearch] = useState("");
  const [searchString, setSearchString] = useState("");
  const [companyId, setCompanyId] = useState(Number);
  const [companyDtls, setCompanyDtls] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)
  const [totalCompanyPosts, setTotalCompanyPosts] = useState(0)
  const [totalReviewPosts, setTotalReviewPosts] = useState(0)

  useEffect(() => {
    getCompanyDetails();
  }, [currentCompanyPage]);

  const getCompanyDetails = async () => {
    const data1 = { currentPage: currentCompanyPage }
    const companyDetails = await axios("/getCompanyDetailsPaginated/", { params: { data: data1 } });
    console.log(companyDetails.data.companyDtls)
    setCompanyDtls(companyDetails.data.companyDtls)
    setTotalCompanyPosts(companyDetails.data.count)
    setCompanyId(companyDetails.data.companyDtls[0].companyId)
    getReviews()
    //console.log(companyDetails.data.companyDtls[0].companyId)
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value)
    console.log(search)
  }

  const handleSearch = (searchString) => {
    console.log("searching")
    const searchResult = companyDtls.filter((company) => {
      const searchCompany = (company.companyName).trim().toLowerCase() === searchString.trim().toLowerCase()
      return searchCompany;
    });
    console.log(searchResult)
    if (searchResult.length > 0) {
      setCompanyDtls(searchResult)
    }

  }

  const searchkeyPress = (e) => {
    if (e.keyCode === 13) {
      console.log('value', e.target.value);
      setSearchString(e.target.value)
      console.log(searchString)
      handleSearch(searchString)
    }
  }

  useEffect(() => {
    getReviews();
  }, [companyId, currentReviewPage]);

  const cardHandler = async (e) => {
    console.log(e)
    setCompanyId(e);
  }

  const getReviews = async () => {
    const data1 = { companyId: companyId, currentPage: currentReviewPage }
    const companyReviews = await axios("/api/getAllReviewsByCompanyId/", { params: { data: data1 } });
    console.log(companyReviews.data.reviews);
    setReviews(companyReviews.data.reviews)
    setTotalReviewPosts(companyReviews.data.count)
  }

  const paginate1 = (pageNumber) => {
    setCurrentCompanyPage(pageNumber)
  };

  const paginate2 = (pageNumber) => {
    setCurrentReviewPage(pageNumber)
  };

  return (
    <div>
      <AdminNavbar />
      <div id="Second" class="row">
        <div class="col-4" style={{ width: "60%" }}>
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
        </div>
      </div>

      <div
        id="third"
        class="row "
        style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}
      >
        <div class="row">
          <div class="col-1"></div>
          <div class="col-6" style={{ marginLeft: '0px' }}>

            {companyDtls.map((company) => (
              <div>
                <Card onClick={() => cardHandler(company.companyId)} style={{ width: "60%", padding: 5 }}>
                  <div>
                    <p>{company.companyName}</p>
                  </div>
                  <div>
                  {/* <a href="/adminPhotos">Company</a> */}
                  </div>
                </Card>
              </div>
            ))}
            <Pagination postsPerPage={20} totalPosts={totalCompanyPosts} paginate={paginate1} />
          </div>


          <div class="col-5">
            {reviews.map((review) => (
              <div>
                <Card style={{ width: "80%", padding: 5 }}>
                  <div>
                    <p>Review Title: {review.reviewTitle}</p>
                    <p>Review Comments: {review.reviewComments}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Role: {review.reviewerRole}</p>
                    <p>Review Status: {review.adminReviewStatus}</p>
                  </div>
                </Card>
              </div>
            ))}
            <Pagination postsPerPage={5} totalPosts={totalReviewPosts} paginate={paginate2} />
          </div>
        </div>


      </div>
    </div>
  );
}

export default AdminCompany;