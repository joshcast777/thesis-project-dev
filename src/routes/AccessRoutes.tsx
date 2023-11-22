/* REACT ROUTER */
import { Navigate, Outlet } from "react-router-dom";

/**
 * Types for the routes verifier
 * @date 21/11/2023 - 2:54:36
 *
 * @typedef {AccessRoutes}
 */
type AccessRoutes = {
	redirectTo: string;
	isAuthenticated: boolean;
	children?: JSX.Element;
};

/**
 * Private routes verifier
 * @date 21/11/2023 - 2:54:36
 *
 * @param {AccessRoutes} param0
 * @param {string} param0.redirectTo
 * @param {boolean} param0.isAuthenticated: authenticated
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
function PrivateRoutes({ redirectTo, isAuthenticated: authenticated, children }: AccessRoutes): JSX.Element {
	return authenticated ? <Navigate to={redirectTo} /> : children || <Outlet />;
}

/**
 * Public routes verifier
 * @date 21/11/2023 - 2:54:36
 *
 * @param {AccessRoutes} param0
 * @param {string} param0.redirectTo
 * @param {boolean} param0.isAuthenticated: authenticated
 * @param {JSX.Element} param0.children
 * @returns {JSX.Element}
 */
function PublicRoutes({ redirectTo, isAuthenticated: authenticated, children }: AccessRoutes): JSX.Element {
	return authenticated ? children || <Outlet /> : <Navigate to={redirectTo} />;
}

export { PrivateRoutes, PublicRoutes };
