// src/hooks/useApi.js
import { useContext } from 'react';
import { AuthContext } from './AuthContent';

const BASE_URL = "http://192.168.204.252:3000";

export const useApi = () => {
    const { token } = useContext(AuthContext);

    const postRequest = async (endpoint, data = {}, isMultipart = false) => {
        console.log(data, "DATA");
        console.log(token, "TOKEN");
        const headers = {
            ...(isMultipart
                ? {}
                : { 'Content-Type': 'application/json' }),
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: isMultipart ? data : JSON.stringify(data),
            });


            const json = await response.json();
            console.log(json, "JSON");

            if (!response.ok) {
                return {
                    success: false,
                    error: json.message || json?.error || 'Something went wrong',
                    status: response.status,
                };
            }

            return { success: true, data: json };
        } catch (error) {
            console.log(error, "ERROR");

            return {
                success: false,
                error: error.message || 'Network error',
            };
        }
    };

    const getRequest = async (endpoint) => {
        try {

            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            const json = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: json.message || 'Something went wrong',
                    status: response.status,
                };
            }

            return { success: true, data: json };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Network error',
            };
        }
    };

    return { getRequest, postRequest };
};
