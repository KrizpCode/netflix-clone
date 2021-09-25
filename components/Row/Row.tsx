import React, { useState, useEffect } from 'react';
import axiosInstance from '../../src/axios';
import Image from 'next/image';

const base_url = 'https://image.tmdb.org/t/p/original/';

interface Props {
	title: string;
	fetchUrl: string;
	isLargeRow?: boolean;
}

interface MovieType {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

interface DataMovieType {
	results: MovieType[];
}

const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState<MovieType[] | []>([]);

	useEffect(() => {
		const fetchData = async () => {
			const request = await axiosInstance.get<DataMovieType>(fetchUrl);
			setMovies(request.data.results);
			return request;
		};
		fetchData();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h2>{title}</h2>

			<div className="row__posters">
				{movies.map((movie) => (
					<img
						key={movie.id}
						className={`row__poster  ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>
		</div>
	);
};

export default Row;
