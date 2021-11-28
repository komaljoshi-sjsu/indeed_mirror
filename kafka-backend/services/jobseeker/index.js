'use strict'
const { getAllUsrReviews } = require('./getAllUsrReviews')
const { appliedjobs } = require('./appliedjobs')
const { companyReviews } = require('./companyReviews')
const { companyReviewsPaginated } = require('./companyReviewsPaginated')
const { companyReviewsRatingSort } = require('./companyReviewsRatingSort')
const { companyReviewsDateSort } = require('./companyReviewsDateSort')
const { companyReviewsHelpfulSort } = require('./companyReviewsHelpfulSort')
const { companyReviewsRatingFilter } = require('./companyReviewsRatingFilter')
const {
  companyReviewsRatingFilterTotal,
} = require('./companyReviewsRatingFilterTotal')
const { updateHelpfulCount } = require('./updateHelpfulCount')
const { saveReview } = require('./saveReview')
const { allReviews } = require('./allReviews')
const { searchReview } = require('./searchReview')
const { reviewsByProfile } = require('./reviewsByProfile')
const { reviewsByProfilePaginated } = require('./reviewsByProfilePaginated')
const { jsApplyJob } = require('./jsApplyJob')
const {
  jsFilterOnJobTitleOrCompanyName,
} = require('./jsFilterOnJobTitleOrCompanyName')
const { jsFilterOnLocation } = require('./jsFilterOnLocation')
const { jsFilterOnLocationAndTitle } = require('./jsFilterOnLocationAndTitle')
const { jsGetCompanyRating } = require('./jsGetCompanyRating')
const { jsGetCompanyReviews } = require('./jsGetCompanyReviews')
const { jsHome } = require('./jsHome')
const { jsPaginatedData } = require('./jsPaginatedData')
const { jsSaveJob } = require('./jsSaveJob')
const { jsUpdateNoOfViews } = require('./jsUpdateNoOfViews')
const { findSalDisplay,
    findSalByTitleDisplay } =require('./findSalaryDisplay')

function handle_request(msg, callback) {
  switch (msg.route) {
    case "appliedjobs":
        appliedjobs(msg,callback);
        break;
    case 'getAllUsrReviews':
      getAllUsrReviews(msg, callback)
      break
    case 'companyReviews':
      companyReviews(msg, callback)
      break
    case 'companyReviewsPaginated':
      companyReviewsPaginated(msg, callback)
      break
    case 'companyReviewsRatingSort':
      companyReviewsRatingSort(msg, callback)
      break
    case 'companyReviewsDateSort':
      companyReviewsDateSort(msg, callback)
      break
    case 'companyReviewsHelpfulSort':
      companyReviewsHelpfulSort(msg, callback)
      break
    case 'companyReviewsRatingFilter':
      companyReviewsRatingFilter(msg, callback)
      break
    case 'companyReviewsRatingFilterTotal':
      companyReviewsRatingFilterTotal(msg, callback)
      break
    case 'updateHelpfulCount':
      updateHelpfulCount(msg, callback)
      break
    case 'saveReview':
      saveReview(msg, callback)
      break
    case 'allReviews':
      allReviews(msg, callback)
      break
    case 'searchReview':
      searchReview(msg, callback)
      break
    case 'reviewsByProfile':
      reviewsByProfile(msg, callback)
      break
    case 'reviewsByProfilePaginated':
      reviewsByProfilePaginated(msg, callback)
      break
    case 'applyJob':
      jsApplyJob(msg, callback)
      break
    case 'filterOnJobTitleOrCompanyName':
      jsFilterOnJobTitleOrCompanyName(msg, callback)
      break
    case 'filterOnLocation':
      jsFilterOnLocation(msg, callback)
      break
    case 'filterOnLocationAndTitle':
      jsFilterOnLocationAndTitle(msg, callback)
      break
    case 'getCompanyRating':
      jsGetCompanyRating(msg, callback)
      break
    case 'getCompanyReviews':
      jsGetCompanyReviews(msg, callback)
      break
    case 'home':
      jsHome(msg, callback)
      break
    case 'paginatedData':
      jsPaginatedData(msg, callback)
      break
    case 'saveJob':
      jsSaveJob(msg, callback)
      break
    case 'updateNoOfViews':
      jsUpdateNoOfViews(msg, callback)
      break
    case 'findSalDisplay':
      findSalDisplay(msg, callback)
      break
    case 'findSalByTitleDisplay':
      findSalByTitleDisplay(msg, callback)
      break
  }
}

exports.handle_request = handle_request
