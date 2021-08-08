import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

const ContentWrapper: FC = ({ children }) => {
	return <Flex
		flexDirection={'column'}
		h={`calc(100vh - 78px) !important`}
	>
		{children}
	</Flex>
};

export default ContentWrapper;