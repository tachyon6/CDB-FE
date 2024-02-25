import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import client from '../../../client';
import { CHECK_IS_ADMIN_AUTHENTICATED } from '../../../gql/admin-auth';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const jwtAccessToken = localStorage.getItem('accessToken');

        client
            .query({
                query: CHECK_IS_ADMIN_AUTHENTICATED,
                context: {
                    headers: {
                        authorization: jwtAccessToken ? `Bearer ${jwtAccessToken}` : '',
                    }
                }
            })
            .then((res) => {
                setIsAuthenticated(res.data.adminCheck);
            })
            .catch((err) => {
                console.log(err);
                setIsAuthenticated(false);
            })
            .finally(() => {
                setIsLoading(false); // 요청 완료 후 로딩 상태 업데이트
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    return (
        isAuthenticated ? children : <Navigate to="/admin" />
    );
};

export default ProtectedRoute;
