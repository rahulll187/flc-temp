import justFetch from '../../utils/justFetch';
import {reset} from 'redux-form';

export const FLC_GET_PROJECT_LOADING = 'FLC_GET_PROJECT_LOADING';
export const FLC_GET_PROJECT_LOADING1 = 'FLC_GET_PROJECT_LOADING1';

export const FLC_GET_PROJECT_SUCCESS = 'FLC_GET_PROJECT_SUCCESS';
export const FLC_GET_PROJECT_FAILED = 'FLC_GET_PROJECT_FAILED';
export const FLC_GET_PROJECT_RESET = 'FLC_GET_PROJECT_RESET';

export const FLC_PROJECT_DETAIL_UPDATE = 'FLC_PROJECT_DETAIL_UPDATE';
export const FLC_GET_PROJECT_DETAIL_SUCCESS = 'FLC_GET_PROJECT_DETAIL_SUCCESS';
export const FLC_GET_PROJECT_DETAIL_FAILED = 'FLC_GET_PROJECT_DETAIL_FAILED';

export const FLC_PROJECT_INSERT_ISSUE_SUCCESS = 'FLC_PROJECT_INSERT_ISSUE_SUCCESS';
export const FLC_PROJECT_INSERT_ISSUE_FAILED = 'FLC_PROJECT_INSERT_ISSUE_FAILED';

export const FLC_PROJECT_DELETE_ISSUE_SUCCESS = 'FLC_PROJECT_DELETE_ISSUE_SUCCESS';
export const FLC_PROJECT_DELETE_ISSUE_FAILED = 'FLC_PROJECT_DELETE_ISSUE_FAILED';

export const FLC_PROJECT_DELETE_IMAGE_SUCCESS = 'FLC_PROJECT_DELETE_IMAGE_SUCCESS';
export const FLC_PROJECT_DELETE_IMAGE_FAILED = 'FLC_PROJECT_DELETE_IMAGE_FAILED';

export const FLC_GET_CURRENT_PROJECT_SUCCESS = 'FLC_GET_CURRENT_PROJECT_SUCCESS';
export const FLC_GET_CURRENT_PROJECT_FAILED = 'FLC_GET_CURRENT_PROJECT_FAILED';

export const FLC_PROJECT_UPLOAD_MEDIA_FILE_SUCCESS = 'FLC_PROJECT_UPLOAD_MEDIA_FILE_SUCCESS';
export const FLC_PROJECT_UPLOAD_MEDIA_FILE_FAILED = 'FLC_PROJECT_UPLOAD_MEDIA_FILE_FAILED';

export const FLC_CREATE_ITEMS_SUCCESS = 'FLC_CREATE_ITEMS_SUCCESS';
export const FLC_CREATE_ITEMS_FAILED = 'FLC_CREATE_ITEMS_FAILED';

export const FLC_SALES_REPORT_SUCCESS = 'FLC_SALES_REPORT_SUCCESS';
export const FLC_SALES_REPORT_FAILED = 'FLC_SALES_REPORT_FAILED';

export const FLC_PROJECT_PROMOTER_EVALUATION_SUCCESS = 'FLC_PROJECT_PROMOTER_EVALUATION_SUCCESS';
export const FLC_PROJECT_PROMOTER_EVALUATION_FAILED = 'FLC_PROJECT_PROMOTER_EVALUATION_FAILED';

export const FLC_GET_EVALUATION_SUCCESS = 'FLC_GET_EVALUATION_SUCCESS';
export const FLC_GET_EVALUATION_FAILED = 'FLC_GET_EVALUATION_FAILED';

export const FLC_GET_SALES_REPORT_SUCCESS = 'FLC_GET_SALES_REPORT_SUCCESS';
export const FLC_GET_SALES_REPORT_FAILED = 'FLC_GET_SALES_REPORT_FAILED';

export const FLC_GET_COMPETATION_REPORT_SUCCESS = 'FLC_GET_COMPETATION_REPORT_SUCCESS';
export const FLC_GET_COMPETATION_REPORT_FAILED = 'FLC_GET_COMPETATION_REPORT_FAILED';

export const FLC_INSERT_COMPETATION_REPORT_SUCCESS = 'FLC_INSERT_COMPETATION_REPORT_SUCCESS';
export const FLC_INSERT_COMPETATION_REPORT_FAILED = 'FLC_INSERT_COMPETATION_REPORT_FAILED';

  export const competationReportCreatedSuccess = data => ({
    type: 'FLC_INSERT_COMPETATION_REPORT_SUCCESS',
    payload: data
  });
  
  export const competationReportCreatedFailed = error => ({
    type: 'FLC_INSERT_COMPETATION_REPORT_FAILED',
    payload: error
  });

export const GetCompetationReportSuccess = data => ({
  type: 'FLC_GET_COMPETATION_REPORT_SUCCESS',
  payload: data
});

export const GetCompetationReportFailed = error => ({
  type: 'FLC_GET_COMPETATION_REPORT_FAILED',
  payload: error
});

export const GetSalesReportSuccess = data => ({
    type: 'FLC_GET_SALES_REPORT_SUCCESS',
    payload: data
  });

export const GetSalesReportFailed = error => ({
    type: 'FLC_GET_SALES_REPORT_FAILED',
    payload: error
  });

export const GetEvaluationSuccess = data => ({
    type: 'FLC_GET_EVALUATION_SUCCESS',
    payload: data
  });

export const GetEvaluationFailed = error => ({
    type: 'FLC_GET_EVALUATION_FAILED',
    payload: error
  });


export const salesReportCreatedSuccess = indicator => ({
    type: 'FLC_SALES_REPORT_SUCCESS',
    payload: indicator
  });

export const salesReportCreatedFailed = indicator => ({
    type: 'FLC_SALES_REPORT_FAILED',
    payload: indicator
  });

export const itemsCreatedSuccess = indicator => ({
    type: 'FLC_CREATE_ITEMS_SUCCESS',
    payload: indicator
  });

export const itemsCreatedFailed = indicator => ({
    type: 'FLC_CREATE_ITEMS_FAILED',
    payload: indicator
  });

export const serviceLoading = indicator => ({
    type: 'FLC_GET_PROJECT_LOADING',
    payload: indicator
  });

  export const serviceLoading1 = indicator => ({
      type: 'FLC_GET_PROJECT_LOADING1',
      payload: indicator
    });

export const serviceSuccess = data => ({
    type: 'FLC_GET_PROJECT_SUCCESS',
    payload: data
  });

export const currentProjectSuccess = data => ({
    type: 'FLC_GET_CURRENT_PROJECT_SUCCESS',
    payload: data
  });

export const currentProjectFailed = error => ({
    type: 'FLC_GET_CURRENT_PROJECT_FAILED',
    payload: error
  });

export const projectDetailAPISuccess = data => ({
    type: 'FLC_GET_PROJECT_DETAIL_SUCCESS',
    payload: data
  });

export const projectDetailUpdate = data => ({
    type: 'FLC_PROJECT_DETAIL_UPDATE',
    payload: data
  });

export const serviceFailed = error => ({
    type: 'FLC_GET_PROJECT_FAILED',
    payload: error
  });

export const projectDetailAPIFailed = error => ({
    type: 'FLC_GET_PROJECT_DETAIL_FAILED',
    payload: error
  });

export const resetProjectsData = data => ({
  type: 'FLC_GET_PROJECT_RESET',
  payload: data
});


export const insertProjectIssuesAPISuccess = data => ({
    type: 'FLC_PROJECT_INSERT_ISSUE_SUCCESS',
    payload: data
  });

  export const insertProjectIssuesAPIFailed = error => ({
      type: 'FLC_PROJECT_INSERT_ISSUE_FAILED',
      payload: error
    });

  export const deleteProjectIssuesAPISuccess = data => ({
      type: 'FLC_PROJECT_DELETE_ISSUE_SUCCESS',
      payload: data
    });

  export const deleteProjectIssuesAPIFailed = error => ({
      type: 'FLC_PROJECT_DELETE_ISSUE_FAILED',
      payload: error
    });

export const upLoadFileSuccess = error => ({
    type: 'FLC_PROJECT_UPLOAD_MEDIA_FILE_SUCCESS',
    payload: error
  });

export const upLoadFileFailed = error => ({
    type: 'FLC_PROJECT_UPLOAD_MEDIA_FILE_FAILED',
    payload: error
});


export const submiteEvaluationSuccess = data => ({
    type: 'FLC_PROJECT_PROMOTER_EVALUATION_SUCCESS',
    payload: data
  });

export const submiteEvaluationFailed = error => ({
    type: 'FLC_PROJECT_PROMOTER_EVALUATION_FAILED',
    payload: error
});

export const deleteMediaFilesSuccess = data => ({
    type: 'FLC_PROJECT_DELETE_IMAGE_SUCCESS',
    payload: data
  });

export const deleteMediaFilesFailed = error => ({
    type: 'FLC_PROJECT_DELETE_IMAGE_FAILED',
    payload: error
  });

export const getProjects = (param) =>
  (dispatch, getState) => {
    const state = getState()
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    dispatch(serviceLoading(true));
    const data = {
      EmailId:Email
    };

    return justFetch({
      url: '/Project/GetList',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        return dispatch(serviceSuccess(results));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(serviceFailed(error));
      })
  };

export const getCurrentProjects = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    dispatch(serviceLoading(true));
    const data = {
      EmailId:Email
    };

    return justFetch({
      url: '/Project/GetCurrentProjects',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        return dispatch(currentProjectSuccess(results));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(currentProjectFailed(error));
      })
  };

  export const getProjectDetails = (param) =>
    (dispatch, getState) => {
      const state = getState();
      //const { Email } = state.login.loginData.loginResponse;
      const { Email } = state.login.response;

      dispatch(serviceLoading1(true));
      const data = {
        EmailId:Email,
        StoreId:param.StoreId
      };

      return justFetch({
        url: '/Project/GetDetails',
        method: 'POST',
        data,
      })
        .then((results) => {
          const responseStatus = results.ResponseStatus;
          if (responseStatus.Code !== 'SUCCESS') {
            throw results;
          }
          return dispatch(projectDetailAPISuccess(results));
        })
        .catch((error) => {
          console.log('Error:',error);
          dispatch(projectDetailAPIFailed(error));
        })
    };

// GET PROJECT DETAIL
export const getProjectDetailsUpdated = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;

    dispatch(serviceLoading1(true));
    const data = {
      EmailId:Email,
      StoreId:StoreId
    };

    return justFetch({
      url: '/Project/GetDetails',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        return dispatch(projectDetailAPISuccess(results));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(projectDetailAPIFailed(error));
      })
  };

// INSERT ISSUES
export const InsertIssues = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      EmailId:Email,
      StoreId:StoreId,
      Comments:param.comments
    };

    return justFetch({
      url: '/Store/InsertStoreIssue',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }

        dispatch(getProjectDetailsUpdated({location:'dubai'}));
        return dispatch(insertProjectIssuesAPISuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(insertProjectIssuesAPIFailed(error));
      })
  };

// DELETE ISSUES
export const DeleteIssues = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    const data = {
      EmailId:Email,
      StoreId:StoreId,
      Id:param.IssueId
    };

    return justFetch({
      url: '/Store/DeleteStoreIssue',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }
        dispatch(getProjectDetailsUpdated({location:'dubai'}));
        return dispatch(deleteProjectIssuesAPISuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(deleteProjectIssuesAPIFailed(error));
      })
  };

  // DELETE MEDAI FILES
  export const DeleteMediaFiles = (param) =>
    (dispatch, getState) => {
      const state = getState();
      //const { Email } = state.login.loginData.loginResponse;
      const { Email } = state.login.response;
      const { StoreId } = state.projects.projectDetail;

      dispatch(serviceLoading1(true));


      const data = {
        EmailId: Email,
        StoreId: StoreId,
        Id: param.mediaID
      };

      return justFetch({
        url: '/Store/DeleteStoreMedia',
        method: 'POST',
        data,
      })
        .then((results) => {
          const responseStatus = results.ResponseStatus;
          if (responseStatus.Code !== 'SUCCESS') {
            throw results;
          }
          const resultResponse = results.ResponseData;
          const data = {
            message:responseStatus.Message
          }
          dispatch(getProjectDetailsUpdated({location:'dubai'}));
          return dispatch(deleteMediaFilesSuccess(data));
        })
        .catch((error) => {
          console.log('Error:',error);
          dispatch(deleteMediaFilesFailed(error));
        })
    };



// UPLOAD MEDIA FILES
export const UploadMediaFile = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      EmailId:Email,
      StoreId:StoreId,
      Base64Images:param.Base64ImageData
    };

    return justFetch({
      url: '/Store/InsertStoreMedia',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }

        dispatch(getProjectDetailsUpdated({location:'dubai'}))
        return dispatch(upLoadFileSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(upLoadFileFailed(error));
      })
  };

// INSERT ITEMS
export const InsertItems = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      EmailId:Email,
      StoreId:StoreId,
      PromoterEmailId:param.PromoterEmailId || Email,
      Products: param.products
    };

    return justFetch({
      url: '/OutOfStock/InsertOutOfStock',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }
        dispatch(getProjectDetailsUpdated({location:'dubai'}))
        return dispatch(itemsCreatedSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(itemsCreatedFailed(error));
      })
  };

// INSERT SALES REPORT
export const InsertSalesReport = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      StoreId:StoreId,
      PromoterEmailId: Email,
      salesCompleted: param.salesCompleted,
      sampling:param.sampling,
      itemPurchased:param.itemPurchased,
      custApproached:param.custApproached,
      custReachedOutTo:param.custReachedOutTo,
      custConsulted:param.custConsulted,
      SalesReportDetail:param.SalesReportDetail
    };

    return justFetch({
      url: '/SalesReport/Insert',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        // const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }
        dispatch(reset('salesReportForm'));
        return dispatch(salesReportCreatedSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(salesReportCreatedFailed(error));
      })
  };

// INSERT EVAULATION
export const InsertEvaluation = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      StoreId:StoreId,
      EmailId:Email,
      PromoterEmailId: param.PromoterEmailId,
      Comment: param.Comments,
      EvaluationDetail: param.EvaluationDetail
    };

    return justFetch({
      url: '/Evaluation/InsertEvaluation',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData;
        const data = {
          message:responseStatus.Message
        }
        return dispatch(submiteEvaluationSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(submiteEvaluationFailed(error));
      })
  };


// GET EVAULAIONS
export const GetEvaluation = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      StoreId:StoreId,
      EmailId:Email,
      PromoterEmailId: param.PromoterEmailId
    };

    return justFetch({
      url: '/Evaluation/GetDetail',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData.EvaluationDetail;
        return dispatch(GetEvaluationSuccess(resultResponse));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(GetEvaluationFailed(error));
      })
  };


// GET SALES REPORT
export const GetSalesReport = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    const { StoreId } = state.projects.projectDetail;
    dispatch(serviceLoading1(true));
    const data = {
      StoreId:StoreId,
      PromoterEmailId: Email
    };

    return justFetch({
      url: '/SalesReport/GetList',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        const resultResponse = results.ResponseData.ReportData;
        return dispatch(GetSalesReportSuccess(resultResponse));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(GetSalesReportFailed(error));
      })
  };

  // GET SALES REPORT
export const GetCompetationReport = (param) =>
(dispatch, getState) => {
  const state = getState();
  const { Email } = state.login.response;
  const { StoreId } = state.projects.projectDetail;
  dispatch(serviceLoading1(true));
  const data = {
    StoreId:StoreId,
    EmailId: Email
  };

  return justFetch({
    url: 'CompReport/GetList',
    method: 'POST',
    data,
  })
    .then((results) => {
      const responseStatus = results.ResponseStatus;
      if (responseStatus.Code !== 'SUCCESS') {
        throw results;
      }
      const resultResponse = results.ResponseData.CompReportData;
      return dispatch(GetCompetationReportSuccess(resultResponse));
    })
    .catch((error) => {
      console.log('Error:',error);
      dispatch(GetCompetationReportFailed(error));
    })
};

// INSERT COMPETATION REPORT
export const InsertCompetationReport = (param) =>
  (dispatch, getState) => {
    const state = getState()
    const { Email } = state.login.response
    const { StoreId } = state.projects.projectDetail
    dispatch(serviceLoading1(true))
    const data = {
      StoreId:StoreId,
      EmailId: Email,
      Base64Images: param.base64Data,
      CompReportDetail:param.competationReportDetail
    };

    return justFetch({
      url: '/CompReport/Insert',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const data = {
          message:responseStatus.Message
        }

        dispatch(reset('competitionReportForm'));
        return dispatch(competationReportCreatedSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(competationReportCreatedFailed(error));
      })
  };

  
