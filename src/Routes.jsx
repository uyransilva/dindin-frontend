import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { getItem } from './utils/storage';


function ProtectedRoutes({ user, redirectTo }) {
    const token = getItem('token');
    const isAuthenticated = token;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}
function LogValidation({ redirectTo }) {
    const token = getItem('token')
    return !token ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route element={<LogValidation redirectTo='/home' />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;