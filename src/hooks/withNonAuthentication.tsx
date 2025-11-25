import React from 'react';
import { useStore } from './useStore';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/configs/constants';

// Định nghĩa kiểu cho các props của HOC
interface WithNoneAuthenticationProps {
    // Các props khác bạn muốn truyền vào
}

export default function withNonAuthentication<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const WithNoneAuthentication = (props: P & WithNoneAuthenticationProps): React.ReactElement => {
        // store
        const {
            authStore: { token }
        } = useStore();

        if (token) {
            return <Navigate to={ROUTES.home.href} />;
        }

        return <WrappedComponent {...(props as P)} />;
    };

    return WithNoneAuthentication;
}
