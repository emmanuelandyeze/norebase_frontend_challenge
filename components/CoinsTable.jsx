'use client';

import { useState, useEffect } from 'react';
import { fetchCoins } from '@/lib/fetchCoins';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const CoinsTable = () => {
	const [coins, setCoins] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true); // Loading state
	const itemsPerPage = 10;

	useEffect(() => {
		async function loadCoins() {
			setLoading(true); // Start loading
			const data = await fetchCoins();
			setCoins(data);
			setLoading(false); // Stop loading once data is fetched
		}
		loadCoins();
	}, []);

	const totalPages = Math.ceil(coins.length / itemsPerPage);

	const currentCoins = coins.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<div className="container mx-auto max-w-full border rounded-lg shadow-lg">
			{/* Table Header for Medium and Larger Screens */}
			<table className="hidden md:table w-full">
				<thead>
					<tr>
						<th className="text-left px-4 py-2 font-bold">
							💰 Coin
						</th>
						<th className="text-left px-4 py-2 font-bold">
							🗋 Code
						</th>
						<th className="text-left px-4 py-2 font-bold">
							🤑 Price
						</th>
						<th className="text-left px-4 py-2 font-bold">
							📈 Total Supply
						</th>
					</tr>
				</thead>
				<tbody>
					{loading
						? Array.from({ length: 10 }).map((_, index) => (
								<tr
									key={index}
									className={`${
										index % 2 === 0
											? 'bg-gray-100'
											: 'bg-white'
									}`}
								>
									<td className="px-4 py-2">
										<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
									</td>
									<td className="px-4 py-2">
										<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
									</td>
									<td className="px-4 py-2">
										<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
									</td>
									<td className="px-4 py-2">
										<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
									</td>
								</tr>
						  ))
						: currentCoins.map((coin, index) => (
								<tr
									key={coin.id}
									className={`${
										index % 2 === 0
											? 'bg-gray-100'
											: 'bg-white'
									}`}
								>
									<td className="px-4 py-2">{coin.name}</td>
									<td className="px-4 py-2">
										{coin.symbol}
									</td>
									<td className="px-4 py-2">
										${coin.price_usd}
									</td>
									<td className="px-4 py-2">
										{coin.tsupply} {coin.symbol}
									</td>
								</tr>
						  ))}
				</tbody>
			</table>

			{/* Responsive Grid for Small Screens */}
			<div className="md:hidden">
				{loading
					? Array.from({ length: 10 }).map((_, index) => (
							<div
								key={index}
								className={`grid grid-cols-2 gap-4 p-4 ${
									index % 2 === 0
										? 'bg-gray-100'
										: 'bg-white'
								}`}
							>
								<div>
									<p className="font-bold">💰Coin</p>
									<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
								</div>
								<div>
									<p className="font-bold">🗋Code</p>
									<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
								</div>
								<div>
									<p className="font-bold">🤑Price</p>
									<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
								</div>
								<div>
									<p className="font-bold">
										📈Total Supply
									</p>
									<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
								</div>
							</div>
					  ))
					: currentCoins.map((coin, index) => (
							<div
								key={coin.id}
								className={`grid grid-cols-2 gap-4 p-4 ${
									index % 2 === 0
										? 'bg-gray-100'
										: 'bg-white'
								}`}
							>
								<div>
									<p className="font-bold">💰Coin</p>
									<p>{coin.name}</p>
								</div>
								<div>
									<p className="font-bold">🗋Code</p>
									<p>{coin.symbol}</p>
								</div>
								<div>
									<p className="font-bold">🤑Price</p>
									<p>${coin.price_usd}</p>
								</div>
								<div>
									<p className="font-bold">
										📈Total Supply
									</p>
									<p>
										{coin.tsupply} {coin.symbol}
									</p>
								</div>
							</div>
					  ))}
			</div>

			<div className="flex justify-between mt-2 mx-4 mb-4">
				{currentPage !== 1 ? (
					<button
						onClick={() =>
							setCurrentPage((prev) =>
								Math.max(prev - 1, 1),
							)
						}
						className="font-bold text-black flex flex-row gap-2 items-center"
					>
						<FaArrowLeft size={16} />
						<p>Previous</p>
					</button>
				) : (
					<div></div>
				)}

				{currentPage !== totalPages ? (
					<button
						onClick={() =>
							setCurrentPage((prev) =>
								Math.min(prev + 1, totalPages),
							)
						}
						disabled={currentPage === totalPages}
						className="font-bold text-black flex flex-row gap-2 items-center"
					>
						<p>Next</p>
						<FaArrowRight size={16} />
					</button>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default CoinsTable;
