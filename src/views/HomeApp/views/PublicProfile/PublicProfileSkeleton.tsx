import { Skeleton } from '@material-ui/lab';

const PublicProfileSkeleton = () => {
	return (
		<>
			<div className="profile-skeleton">
				<div className="top">
					<Skeleton
						variant="circle"
						width={80}
						height={80}
						className="skeleton-comp"
					/>
					<Skeleton
						variant="circle"
						width={20}
						height={20}
						className="skeleton-comp"
					/>
				</div>
				<Skeleton
					variant="text"
					width="10%"
					height={20}
					className="skeleton-comp"
				/>
				<Skeleton
					variant="text"
					width="20%"
					height={20}
					className="skeleton-comp"
				/>

				<Skeleton
					variant="text"
					width="40%"
					height={20}
					className="skeleton-comp"
				/>
			</div>
			<div className="related-groups">
				<Skeleton
					variant="text"
					width="30%"
					height={35}
					className="skeleton-comp"
				/>
				<div className="group">
					<Skeleton
						variant="circle"
						width={80}
						height={80}
						className="skeleton-comp"
					/>
					<Skeleton
						style={{ marginTop: '1rem', marginLeft: '1rem' }}
						variant="rect"
						width="80%"
						height={30}
						className="skeleton-comp"
					/>
				</div>
				<div className="group">
					<Skeleton
						variant="circle"
						width={80}
						height={80}
						className="skeleton-comp"
					/>
					<Skeleton
						style={{ marginTop: '1rem', marginLeft: '1rem' }}
						variant="rect"
						width="80%"
						height={30}
						className="skeleton-comp"
					/>
				</div>
				<div className="group">
					<Skeleton
						variant="circle"
						width={80}
						height={80}
						className="skeleton-comp"
					/>
					<Skeleton
						style={{ marginTop: '1rem', marginLeft: '1rem' }}
						variant="rect"
						width="80%"
						height={30}
						className="skeleton-comp"
					/>
				</div>
			</div>
		</>
	);
};

export default PublicProfileSkeleton;
