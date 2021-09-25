import '../styles/globals.css';
import type { AppProps } from 'next/app';

import '../components/Row/Row.css';
import '../components/Banner/Banner.css';
import '../components/Nav/Nav.css';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
export default MyApp;
