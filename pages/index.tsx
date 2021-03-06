import type { NextPage } from 'next';
import Head from 'next/head';

import requests from '../src/requests';
import Row from '../components/Row/Row';
import Banner from '../components/Banner/Banner';
import Nav from '../components/Nav/Nav';

const Home: NextPage = () => {
	return (
		<div className="app">
			<Head>
				<title>Netflix Clone</title>
				<meta name="description" content="Netflix Clone" />
			</Head>
			<Nav />
			<Banner />
			<Row
				title="NETFLIX ORIGINALS"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row title="Trending Now" fetchUrl={requests.fetchTrending} />
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
};

export default Home;
