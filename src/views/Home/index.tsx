import React from 'react';
import './style.scss';
import Navbar from '../../components/NavBar';

interface HomeViewProps {}

const HomeView: React.FC<HomeViewProps> = () => {
	return (
		<>
			<Navbar />
			<p>This is a home component</p>
		</>
	);
};

export default HomeView;
