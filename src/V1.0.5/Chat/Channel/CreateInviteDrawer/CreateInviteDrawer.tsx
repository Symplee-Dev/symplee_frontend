import { Drawer, Tooltip } from '@material-ui/core';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import makeAnimated from 'react-select/animated';

import Select from 'react-select';
import { useState } from 'react';
import { Button } from '../../../components';
import { UISelectors, UserSelectors } from '../../../../redux/selectors';
import {
	useSendInviteMutation,
	useGetAcceptedFriendsQuery
} from '../../../../graphql';

const usesOptions = [
	{ value: 1, label: '1', className: 'option' },
	{ value: 5, label: '5', className: 'option' },
	{ value: 10, label: '10', className: 'option' },
	{ value: 20, label: '20', className: 'option' },
	{ value: 50, label: '50', className: 'option' },
	{ value: 100, label: '100', className: 'option' },
	{ value: 1000, label: '1000', className: 'option' },
	{ value: -1, label: 'Unlimited', className: 'option' }
];

const animatedComponents = makeAnimated();

const CreateInviteDrawer = ({
	open,
	setOpen
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [uses, setUses] = useState<any>({
		value: -1,
		label: 'Unlimited',
		className: 'option'
	});
	const userId = UserSelectors.useSelectUserId()!;
	const currentGroup = UISelectors.useSelectCurrentChatGroup();
	const [to, setTo] = useState<any[]>([]);
	const [selected, setSelected] = useState<any[]>([]);

	const [sendInvite, { data, loading, error }] = useSendInviteMutation();
	const [code, setCode] = useState<string | undefined>();
	const [copied, setCopied] = useState(false);

	const {
		data: friends,
		loading: friendsLoading,
		error: friendsError
	} = useGetAcceptedFriendsQuery({
		variables: { userId: userId },
		onCompleted: d => {
			const friends = d.getAcceptedFriends.map(f => {
				return {
					value: f?.friend?.id,
					label: `${f?.friend?.username}#${f?.friend?.key}`
				};
			});
			setTo(friends);
		}
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (uses) {
			sendInvite({
				variables: {
					invite: {
						fromId: userId,
						to: selected.map(s => s.value),
						groupId: currentGroup!.id,
						uses: uses.value
					}
				}
			}).then(d => setCode(d.data?.sendInvite));
		}
	};

	const onCopy = () => {
		navigator.clipboard.writeText(code ?? '');

		setCopied(true);
	};

	return (
		<Drawer variant="persistent" anchor="right" open={open}>
			<div className="drawer">
				<div className="top">
					<FontAwesomeIcon icon={faTimes} onClick={() => setOpen(false)} />
				</div>
				<div className="content">
					<div className="content-top">
						<h4>Create Invite</h4>
						<p className="desc">
							Here you can create an invite for this server. This can be sent
							directly or copied as a joinable link. Members using the link must
							have an account or signup before accepting.
						</p>
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<p>How many uses do you want available on this invite?</p>
							<Select
								defaultValue={-1}
								components={animatedComponents}
								value={uses}
								onChange={setUses}
								options={usesOptions}
								className="select-component"
								theme={theme => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary: '#212529',
										primary25: '#ebebeb'
									}
								})}
							/>
							<p>Select friends to send the invite to (Optional)</p>
							<Select
								isMulti
								components={animatedComponents}
								value={selected}
								onChange={setSelected}
								options={to}
								className="select-component"
								theme={theme => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary: '#212529',
										primary25: '#ebebeb'
									}
								})}
							/>
						</div>
						{!code && (
							<Button
								clickHandler={() => {
									sendInvite({
										variables: {
											invite: {
												fromId: userId,
												to: selected.map(s => s.id),
												groupId: currentGroup!.id,
												uses: uses.value
											}
										}
									});
								}}
								content="Generate"
								color="success"
								size="large"
							/>
						)}
						{code && (
							<div className="code" onClick={onCopy}>
								<Tooltip placement="top" title="Copy">
									<span>{code}</span>
								</Tooltip>
							</div>
						)}
						{code && copied && (
							<h5
								style={{
									marginTop: '2rem',
									fontWeight: 400,
									textAlign: 'center'
								}}
							>
								Copied!
							</h5>
						)}
					</form>
				</div>
			</div>
		</Drawer>
	);
};

export default CreateInviteDrawer;
