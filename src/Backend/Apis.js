// src/hooks/useApi.js
import {useContext} from 'react';
import {AuthContext} from './AuthContent';

const BASE_URL = 'https://dearexpress.com/public/api';

export const useApi = () => {
  const {token} = useContext(AuthContext);
  

  const postRequest = async (endpoint, data = {}, isMultipart = false) => {
    // Set headers depending on request type
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...(isMultipart ? {} : {'Content-Type': 'application/json'}),
    };

    console.log(`${BASE_URL}${endpoint}`, data, 'DATATT');

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: isMultipart ? data : JSON.stringify(data),
      });
      // Log the full response object (optional)

      // Get raw response text first
      const text = await response.text();

      // Try to parse JSON from the text
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        console.log('Failed to parse JSON:', err.message);
      }

      // Handle HTTP errors
      if (!response.ok) {
        return {
          success: false,
          error: json?.message || json?.error || 'Something went wrong',
          status: response.status,
        };
      }

      // Return parsed JSON data on success
      return {success: true, data: json, msg: json?.msg, token: json?.token};
    } catch (error) {
      console.log('Network or fetch error:', error);
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  };

  const getRequest = async endpoint => {
    console.log(token, 'TOKENNNN');

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && {Authorization: `Bearer ${token}`}),
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      // Read raw response text
      const text = await response.text();

      // Parse JSON safely
      let json = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        console.log('Failed to parse JSON:', err.message);
      }

      if (!response.ok) {
        return {
          success: false,
          error: json?.message || json?.error || 'Something went wrong',
          status: response.status,
        };
      }

      return {success: true, data: json, msg: json?.msg};
    } catch (error) {
      console.log('Network or fetch error:', error);
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  };

  return {getRequest, postRequest};
};
