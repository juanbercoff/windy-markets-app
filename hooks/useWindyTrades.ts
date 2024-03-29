import { useCallback, useEffect, useState } from 'react';
import { UserTrade, Trade, Image } from '../types/types';
import Constants from 'expo-constants';

export const useWindyTrades = (shouldFetch: boolean, isFocused: boolean) => {
	const [windyTrades, setWindyTrades] = useState<Trade[]>([]);
	const [fetching, setFetching] = useState<Boolean>(false);
	const getWindyTrades = useCallback(async () => {
		setFetching(true);
		try {
			const response = await fetch(
				Constants.manifest.extra.API_URL + '/api/trades/current',
				{
					method: 'GET',
					credentials: 'include',
				}
			);
			const trades = await response.json();

			setWindyTrades(trades);
		} catch (error) {
			console.error(error);
		}
		setFetching(false);
	}, []);

	useEffect(() => {
		if (shouldFetch) {
			getWindyTrades();
		}
	}, [getWindyTrades, shouldFetch, isFocused]);

	return {
		windyTrades,
		fetching,
	};
};

export const useUserTrades = (
	userId: string,
	shouldFetch: boolean,
	isFocused: boolean
) => {
	const [userTrades, setUserTrades] = useState<UserTrade[]>([]);
	const [fetching, setFetching] = useState<Boolean>(false);

	const getUserTrades = useCallback(async () => {
		setFetching(true);
		try {
			const response = await fetch(
				`${Constants.manifest.extra.API_URL}/api/userTrades/all/${userId}`,
				{
					method: 'GET',
					credentials: 'include',
				}
			);
			const trades = await response.json();

			setUserTrades(trades);
		} catch (error) {
			console.error(error);
		}
		setFetching(false);
	}, [userId]);

	useEffect(() => {
		if (shouldFetch) {
			getUserTrades();
		}
	}, [userId, getUserTrades, shouldFetch, isFocused]);

	return {
		userTrades,
		fetching,
	};
};

export const useWindyImages = (uri: string) => {
	const [fetching, setFetching] = useState<Boolean>(false);
	const [images, setImages] = useState<Image[]>([]);

	const getWindyImages = async (uri: string) => {
		setFetching(true);
		try {
			const response = await fetch(uri, {
				method: 'GET',
				credentials: 'include',
			});
			if (response.ok) {
				const images = await response.json();
				setImages(images);
			}
			throw 'error';
		} catch (e) {
			console.log(e);
		}
		setFetching(false);
	};

	useEffect(() => {
		getWindyImages(uri);
	}, []);

	return {
		images,
		fetching,
	};
};
