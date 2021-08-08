import { Box, Divider, Heading, HStack, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FC } from 'react';

interface Interface {
	title: string
}

const NavigationHeader: FC<Interface> = ({ title }) => {
	return <Box mb={3}>
		<Box>
			<HStack>
				<Box w={1.5}/>
				<Link passHref href={'/'}>
					<IconButton
						variant={'ghost'}
						rounded={'full'}
						as={'a'}
						icon={<ArrowBackIcon fontSize={'x-large'}/>}
						aria-label={'Back to the home page'}
					/>
				</Link>
				<Heading fontSize={'lg'}>
					{title}
				</Heading>
			</HStack>
		</Box>
		<Divider mb={'-3'}/>
	</Box>
}

export default NavigationHeader;