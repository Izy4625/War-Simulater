// // src/components/Auth/ProtectedRoute.tsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { AppDispatch, RootState } from '../../store/store';
// // import { verifyAdmin } from '../../store/features/authSlice';
// import { Box, CircularProgress } from '@mui/material';

// interface ProtectedRouteProps {
//     children?: React.ReactNode;
//     requireAdmin?: boolean;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
//     children, 
//     requireAdmin = false 
// }) => {
//     // const dispatch = useDispatch<AppDispatch>();
//     // const auth = useSelector((state: RootState) => state.auth);
//     const [isVerifying, setIsVerifying] = useState(requireAdmin && !auth.adminVerified);

//     useEffect(() => {
//         if (requireAdmin && !auth.adminVerified && auth.token) {
//             setIsVerifying(true);
//             dispatch(verifyAdmin())
//                 .finally(() => setIsVerifying(false));
//         }
//     }, [requireAdmin, auth.adminVerified, auth.token, dispatch]);

//     if (!auth.token) {
//         return <Navigate to="/login" />;
//     }

//     if (isVerifying) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (requireAdmin && !auth.adminVerified) {
//         return <Navigate to="/" />;
//     }

//     return children ? <>{children}</> : <Outlet />;
// };

// export default ProtectedRoute;