import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

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

	const opts = {
		// height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

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
				.catch((error: Error) => console.log(error));
		}
	};

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						className={`row__poster  ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};

export default Row;
