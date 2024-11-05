import axios from 'axios';

export async function fetchCoins() {
	try {
		const response = await axios.get(
			'https://api.coinlore.net/api/tickers/',
		);
		return response.data.data;
	} catch (error) {
		console.error('Error fetching coins:', error);
		return [];
	}
}
