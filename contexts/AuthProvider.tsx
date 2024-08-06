'use client';
import clientAxios from '@/api/clientAxios';
import { BASE_URL } from '@/lib/constants';
import { AuthTokens, Role, User } from '@/lib/types';
import { getUserToken } from '@/lib/utils';
import React, { createContext, useReducer, ReactNode, useEffect } from 'react';

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCompanyOwner: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  isCompanyOwner: false,
};

// Define action types
enum ActionType {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE = 'LOGOUT_FAILURE',
}

//Action types
interface LoginRequestAction {
  type: ActionType.LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: { user: User };
}

interface LoginFailureAction {
  type: ActionType.LOGIN_FAILURE;
}

interface LogoutRequestAction {
  type: ActionType.LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: ActionType.LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: ActionType.LOGOUT_FAILURE;
}

// Define action creators
export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;

// Create the reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
    case ActionType.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isAdmin:
          action.payload.user.role === Role.ADMIN || action.payload.user.role === Role.SUPER_ADMIN,
        loading: false,
      };
    case ActionType.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, user: null, isAdmin: false };
    case ActionType.LOGOUT_SUCCESS:
      return { ...state, user: null, isAuthenticated: false, isAdmin: false, loading: false };
    case ActionType.LOGOUT_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<
  { state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const setUpLoggedInUser = async () => {
      try {
        dispatch({ type: ActionType.LOGIN_REQUEST });
        const storedUser = getUserToken();
        if (storedUser) {
          const { data } = await clientAxios.post<AuthTokens>(BASE_URL + '/api/auth/refresh');
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { user: storedUser } });
          return;
        }
        dispatch({ type: ActionType.LOGIN_FAILURE });
      } catch (error) {
        dispatch({ type: ActionType.LOGIN_FAILURE });
      }
    };
    setUpLoggedInUser();
  }, []);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, ActionType };
