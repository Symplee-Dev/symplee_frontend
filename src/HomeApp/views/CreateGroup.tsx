import { Add } from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { motion } from 'framer-motion';
import CheckIcon from '@material-ui/icons/Check';

import './createGroup.scss';
import { useState, useEffect } from 'react';
import { Avatar, LinearProgress, TextField } from '@material-ui/core';
import { Exact, useCreateChatGroupMutation, UserQuery } from '../../graphql';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router';
import { ApolloQueryResult } from '@apollo/client';

const CreateGroup = ({
	refetch
}: {
	refetch:
		| ((
				variables?:
					| Partial<
							Exact<{
								id: number;
							}>
					  >
					| undefined
		  ) => Promise<ApolloQueryResult<UserQuery>>)
		| undefined;
}) => {
	const [newGroup, setNewGroup] = useState({
		isPublic: false,
		name: ''
	});

	const history = useHistory();

	const [create, { data, loading, error }] = useCreateChatGroupMutation();

	const userId = useSelector((state: RootStateOrAny) => state.user.userId);

	useEffect(() => {
		if (data && !loading && !error) {
			//@ts-ignore
			refetch({ fetchPolicy: 'network-only' });
			history.push('/group/' + data.createChatGroup.id);
		}
	}, [data, error, history, loading, refetch]);

	const handleSubmit = e => {
		e.preventDefault();

		create({ variables: { chatGroup: { ...newGroup, userId } } });
	};

	return (
		<motion.div exit={{ opacity: 0 }} className="create-group">
			<div className="banner">
				<div>
					<h2>Groups</h2> <Add className="icon" />
				</div>
				<p>Create a new group.</p>
			</div>
			{loading && <LinearProgress color="primary" />}
			{!loading && (
				<form onSubmit={handleSubmit}>
					<div className="body">
						<div className="top-body">
							<Avatar className="avatar">
								{newGroup.name[0]}
							</Avatar>
							<h2>
								{newGroup.name.length <= 0
									? 'Untitled Group'
									: newGroup.name}
							</h2>
							<p>
								{newGroup.isPublic ? '(Public)' : '(Private)'}
							</p>
						</div>
						<TextField
							fullWidth
							required
							variant="filled"
							placeholder="Group Name"
							color="primary"
							inputProps={{ className: 'name-field' }}
							value={newGroup.name}
							onChange={e =>
								setNewGroup({
									...newGroup,
									name: e.target.value
								})
							}
						/>
					</div>
					<div className="settings">
						<div className="top">
							<h2>Group Settings</h2>
							<p>
								{!newGroup.isPublic
									? 'This group is currently set to private and will not be able to be found on the community page'
									: 'This group is currently set to public and will be able to be found on the community page'}
							</p>
							<ToggleButton
								value={newGroup.isPublic}
								selected={newGroup.isPublic}
								onChange={() =>
									setNewGroup({
										...newGroup,
										isPublic: !newGroup.isPublic
									})
								}
							>
								<CheckIcon />
							</ToggleButton>
						</div>
						<button className="create-btn">Create Group</button>
					</div>
				</form>
			)}
		</motion.div>
	);
};

export default CreateGroup;
