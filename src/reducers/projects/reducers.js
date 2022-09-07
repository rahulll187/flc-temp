import {
  FLC_GET_PROJECT_LOADING,
  FLC_GET_PROJECT_LOADING1,
  FLC_GET_PROJECT_SUCCESS,
  FLC_GET_PROJECT_FAILED,
  FLC_GET_PROJECT_RESET,
  FLC_GET_PROJECT_DETAIL_SUCCESS,
  FLC_GET_PROJECT_DETAIL_FAILED,
  FLC_PROJECT_INSERT_ISSUE_SUCCESS,
  FLC_PROJECT_INSERT_ISSUE_FAILED,
  FLC_PROJECT_DELETE_ISSUE_SUCCESS,
  FLC_PROJECT_DELETE_ISSUE_FAILED,
  FLC_PROJECT_DETAIL_UPDATE,
  FLC_GET_CURRENT_PROJECT_SUCCESS,
  FLC_GET_CURRENT_PROJECT_FAILED,
  FLC_PROJECT_UPLOAD_MEDIA_FILE_SUCCESS,
  FLC_PROJECT_UPLOAD_MEDIA_FILE_FAILED,
  FLC_CREATE_ITEMS_SUCCESS,
  FLC_CREATE_ITEMS_FAILED,
  FLC_SALES_REPORT_SUCCESS,
  FLC_SALES_REPORT_FAILED,
  FLC_PROJECT_PROMOTER_EVALUATION_SUCCESS,
  FLC_PROJECT_PROMOTER_EVALUATION_FAILED,
  FLC_GET_EVALUATION_SUCCESS,
  FLC_GET_EVALUATION_FAILED,
  FLC_GET_SALES_REPORT_SUCCESS,
  FLC_GET_SALES_REPORT_FAILED,
  FLC_PROJECT_DELETE_IMAGE_SUCCESS,
  FLC_PROJECT_DELETE_IMAGE_FAILED,
  FLC_GET_COMPETATION_REPORT_SUCCESS,
  FLC_GET_COMPETATION_REPORT_FAILED,
  FLC_INSERT_COMPETATION_REPORT_SUCCESS,
  FLC_INSERT_COMPETATION_REPORT_FAILED
} from './actions';

const initState = {
  isLoading: false,
  projects: undefined,
  currentProjects: undefined,
  projectDetail: undefined,
  error: undefined,
  message: undefined,
  evaulationResults: [],
  salesReportResult: undefined,
  competationResult: undefined
};

export default function reducer(state = initState, action) {

  switch (action.type) {

    case FLC_GET_PROJECT_LOADING:
    case FLC_GET_PROJECT_LOADING1:
      return {
        ...state,
        isLoading: action.payload,
        error: undefined,
      };
    case FLC_GET_CURRENT_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentProjects: action.payload.ResponseData,
        error: undefined,
        //message:action.payload.ResponseStatus.Message,
      }
    case FLC_GET_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload.ResponseData,
        error: undefined,
        //message:action.payload.ResponseStatus.Message,
      };
    case FLC_GET_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectDetail: action.payload.ResponseData,
        error: undefined,
        //message:action.payload.ResponseStatus.Message,
      };

    case FLC_PROJECT_INSERT_ISSUE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //projectDetail: action.payload.ResponseData.Issues,
        error: undefined,
        message: action.payload.message,
      };

    case FLC_CREATE_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //projectDetail: action.payload.ResponseData.Issues,
        error: undefined,
        message: action.payload.message,
      };
    case FLC_PROJECT_INSERT_ISSUE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      };

    case FLC_CREATE_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      };

    case FLC_PROJECT_DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: action.payload.message,
      };
    case FLC_PROJECT_DELETE_IMAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      }
    case FLC_PROJECT_DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: action.payload.message,
      };
    case FLC_PROJECT_DELETE_ISSUE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      };

    case FLC_GET_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        //error:action.payload,
        error: undefined,
        message: undefined
      };
    case FLC_GET_PROJECT_DETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      };
    case FLC_GET_CURRENT_PROJECT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
        // currentProjects:undefined,
      };

    case FLC_PROJECT_DETAIL_UPDATE:
      return {
        ...state,
        projectDetail: action.payload
      }
    case FLC_GET_PROJECT_RESET:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: undefined
      }
    case FLC_PROJECT_UPLOAD_MEDIA_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        //projectDetail: action.payload.ResponseData.Issues,
        error: undefined,
        message: action.payload.message,
      }
    case FLC_PROJECT_UPLOAD_MEDIA_FILE_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      }
    case FLC_SALES_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: action.payload.message,
      }

    case FLC_SALES_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      }

    case FLC_PROJECT_PROMOTER_EVALUATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: action.payload.message,
      };
    case FLC_PROJECT_PROMOTER_EVALUATION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      };
    case FLC_GET_EVALUATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        evaulationResults: action.payload,
      };
    case FLC_GET_EVALUATION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      };

    case FLC_GET_SALES_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        salesReportResult: action.payload,
      }
    case FLC_GET_SALES_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      }
    case FLC_GET_COMPETATION_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        competationResult: action.payload,
      }
    case FLC_GET_COMPETATION_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      }
      case FLC_INSERT_COMPETATION_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: action.payload.message,
      }

    case FLC_INSERT_COMPETATION_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined,
      }

    default:
      return state;
  }
}
