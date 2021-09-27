import React, { useState, useEffect } from 'react';

import axiosInstance from '../../src/axios';
import requests from '../../src/requests';
import { MovieType, DataMovieType } from '../../types/types';

const Banner = () => {
	const [movie, setMovie] = useState<MovieType | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			const request = await axiosInstance.get<DataMovieType>(
				requests.fetchNetflixOriginals
			);

			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			return request;
		};
		fetchData();
	}, []);

	const truncate = (str: string, n: number) => {
		return str.length > n ? str.substr(0, n - 1) + '...' : str;
	};

	return (
		<header
			className="banner"
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url(
                    'https://image.tmdb.org/t/p/original/${movie?.backdrop_path}'
                )`,
				backgroundPosition: 'center center',
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<h2 className="banner__description">
					{movie?.overview && truncate(movie?.overview, 150)}
				</h2>
			</div>

			<div className="banner__fadeBottom" />
		</header>
	);
};

export default Banner;
