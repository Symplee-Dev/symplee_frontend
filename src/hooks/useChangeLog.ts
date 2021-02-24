import { Exact, ChangeLogsQuery } from '../graphql';
import { useState, useEffect } from 'react';
import { UISelectors } from '../redux/selectors';
import { UIActions } from '../redux/actions/index';
import { QueryLazyOptions } from '@apollo/client';

export const useChangeLog = ({
	getChangeLog,
	changeLog,
	changeLogLoading
}: {
	getChangeLog: (
		options?:
			| QueryLazyOptions<
					Exact<{
						[key: string]: never;
					}>
			  >
			| undefined
	) => void;
	changeLog: ChangeLogsQuery | undefined;
	changeLogLoading: boolean;
}) => {
	const [currentLog, setCurrentLog] = useState<
		| { id: number; body: string; changes: string[]; version: string }
		| undefined
	>();

	const hasLatestChangeLog = UISelectors.useSelectHasLatestChangeLog();
	const setHasLatestChangeLog = UIActions.useSetHasLatestChangeLog();
	const [changeLogOpen, setChangeLogOpen] = useState(false);
	const [changeLogOpened, setChangeLogOpened] = useState(false);

	useEffect(() => {
		if (!hasLatestChangeLog.value && !changeLogLoading) {
			if (changeLog) {
				const storedChangelog = window.localStorage.getItem(
					'bolt_changelog'
				);

				if (storedChangelog) {
					// parse the stored changelog
					const parsed: { id: number; version: string } = JSON.parse(
						storedChangelog
					);

					// find one with a newer id if any
					const newest = changeLog.changeLogs.find(
						log => log.id === parsed.id + 1
					);

					if (newest) {
						// if new version set new changelog to local storage
						localStorage.setItem(
							'bolt_changelog',
							JSON.stringify({
								id: newest.id,
								version: newest.version
							})
						);
						setHasLatestChangeLog({
							value: true
						});
						setCurrentLog(newest);
					} else {
						if (!hasLatestChangeLog) {
							setHasLatestChangeLog({
								value: true
							});

							const newest = changeLog.changeLogs.find(
								log => log.id === parsed.id
							);

							setChangeLogOpened(true);

							setCurrentLog(newest);
						}
					}
				} else {
					const newest = changeLog.changeLogs.reduce(function (
						prev,
						current
					) {
						if (+current.id > +prev.id) {
							return current;
						} else {
							return prev;
						}
					});

					// fetch because none exists yet
					localStorage.setItem(
						'bolt_changelog',
						JSON.stringify({
							id: newest.id,
							version: newest.version
						})
					);

					setCurrentLog(newest);
				}
				setHasLatestChangeLog({
					value: true
				});
			} else {
				// fetch data because no data yet
				getChangeLog();
			}
		}

		if (
			hasLatestChangeLog.value === true &&
			hasLatestChangeLog.dateSet === new Date().toString() &&
			!changeLogOpened
		) {
			// set modal open
			setChangeLogOpen(true);
			setChangeLogOpened(true);
		}
	}, [
		changeLog,
		getChangeLog,
		hasLatestChangeLog,
		changeLogOpened,
		changeLogLoading,
		setHasLatestChangeLog
	]);

	return { changeLogOpen, setChangeLogOpen, currentLog };
};
