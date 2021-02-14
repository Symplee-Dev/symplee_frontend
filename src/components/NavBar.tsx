import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

interface NavBarProps {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			cursor: 'pointer'
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1
		}
	})
);

const NavBar: React.FC<NavBarProps> = () => {
	const classes = useStyles();
	const history = useHistory();

	const handleRoute = (e: React.MouseEvent, route: string) => {
		e.preventDefault();
		history.push(route);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar variant="dense">
					<Typography
						variant="h6"
						color="inherit"
						className={classes.title}
						onClick={e => handleRoute(e, '/')}
					>
						Bolt Chat
					</Typography>
					<Button
						color="inherit"
						onClick={e => handleRoute(e, '/signup')}
						className={classes.menuButton}
					>
						Sign Up
					</Button>
					<Button
						color="inherit"
						onClick={e => handleRoute(e, '/login')}
						className={classes.menuButton}
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
