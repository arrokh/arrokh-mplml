import { Box } from '@chakra-ui/react';
import { FC } from 'react';

const LayoutWrapper: FC = ({ children }) => {
	return <Box my={3}>
		{children}
	</Box>
}

export default LayoutWrapper;