import MemberCard from './MemberCard';

const fakeUsers = [
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	},
	{
		username: 'NateTheSLONG',
		key: '21jdc4',
		avatar: 'https://i.imgflip.com/4edvdr.jpg'
	}
];

const MembersBar = () => {
	return (
		<div className="members-bar">
			<h3>All Members</h3>
			<hr />
			{fakeUsers.map((user, key) => {
				return <MemberCard user={user} key={key} />;
			})}
		</div>
	);
};

export default MembersBar;
