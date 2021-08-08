import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS={true}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
