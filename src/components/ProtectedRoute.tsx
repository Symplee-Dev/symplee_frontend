import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { Rstate } from '../types';

interface ProtectedRouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	...rest
}) => {
	const isLoggedIn = useSelector(({ user }: Rstate) => user.isLoggedIn);

	return (
		<>
			<Route
				{...rest}
				render={({ location }) => {
					return isLoggedIn ? (
						children
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: location }
							}}
						/>
					);
				}}
			/>
		</>
	);
};

export default ProtectedRoute;
