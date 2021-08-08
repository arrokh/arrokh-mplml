import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Index() {
	return <Center h={'100vh'} flexDirection={'column'}>
		<VStack
			justifyContent={'center'}
			p={6}
			spacing={12}
			minH={'90vh'}
		>
			<Heading
				fontWeight={0}
				textAlign={'center'}
				mt={'-6'}
			>
				My Projects Learning <br/>
				Machine Learning<br/>
				Give It Try<br/>
				🚀
			</Heading>
			<VStack>
				<Link passHref href={'/object-detection'}>
					<Button
						as={'a'}
						colorScheme={'linkedin'}
						rounded={'full'}
						size={'sm'}
					>
						Object Detection 📹
					</Button>
				</Link>
				<Link passHref href={'/handwriting-number-detection'}>
					<Button
						as={'a'}
						colorScheme={'linkedin'}
						rounded={'full'}
						size={'sm'}
					>
						Handwriting Detection ✍
					</Button>
				</Link>
			</VStack>
		</VStack>
		<Box h={3}/>
		<Box>
			<Text fontSize={'x-small'} textAlign={'center'}>
				© 2021 Noor Octavian Anwar
				<br/>
				All right reserved.
			</Text>
		</Box>
	</Center>
}