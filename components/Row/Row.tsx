import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
const movieTrailer = require('movie-trailer');

import Image from 'next/image';

import axiosInstance from '../../src/axios';
import { MovieType, DataMovieType } from '../../types/types';

const base_url = 'https://image.tmdb.org/t/p/original/';

interface Props {
	title: string;
	fetchUrl: string;
	isLargeRow?: boolean;
}

const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState<MovieType[] | []>([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const request = await axiosInstance.get<DataMovieType>(fetchUrl);
			setMovies(request.data.results);
			return request;
		};
		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie: MovieType) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name || '')
				.then((url: string) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					const trailerUrlParam = urlParams.get('v');
					if (trailerUrlParam !== null) {
						setTrailerUrl(trailerUrlParam);
					}
				})
				.catch((error: Error) => console.log(error.message));
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => {
					if (
						(isLargeRow && movie.poster_path) ||
						(!isLargeRow && movie.backdrop_path)
					) {
						return (
							<div>
								<div
									key={movie.id}
									className="row__posters-wrapper"
									style={{
										width: isLargeRow ? 170 : 178,
										height: isLargeRow ? 250 : 100,
									}}
								>
									<Image
										key={movie.id}
										onClick={() => handleClick(movie)}
										className={`row__poster  ${
											isLargeRow && 'row__posterLarge'
										}`}
										src={`${base_url}${
											isLargeRow ? movie.poster_path : movie.backdrop_path
										}`}
										alt={movie.name}
										layout="fill"
									/>
								</div>
							</div>
						);
					}
				})}
			</div>
			{trailerUrl && (
				<YouTube
					videoId={trailerUrl}
					opts={{
						width: '100%',
						playerVars: {
							autoplay: 1,
						},
					}}
				/>
			)}
		</div>
	);
};

export default Row;
