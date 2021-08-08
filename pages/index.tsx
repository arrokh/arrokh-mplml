import { Box, Button, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';

export default function Index() {
	return <Center h={'100vh'} flexDirection={'column'}>
		<VStack
			justifyContent={'center'}
			p={6}
			spacing={12}
			minH={'90vh'}
		>
			<Heading
				textAlign={'center'}
				fontSize={'x-large'}
				mt={'-6'}
			>
				{`"`} My Projects Learning <br/>
				Machine Learning~<br/>
				Give It Try! {`"`}<br/>
				🚀
			</Heading>

			<VStack>
				<Link passHref href={'/object-detection'}>
					<Button
						as={'a'}
						colorScheme={'linkedin'}
						rounded={'full'}
					>
						Object Detection 📹
					</Button>
				</Link>
				<Button
					as={'a'}
					colorScheme={'linkedin'}
					rounded={'full'}
					size={'xs'}
					onClick={() => Router.replace('https://www.instagram.com/nooroctaviananwar')}
				>
					Soon ... 👩‍💻
				</Button>

				{/*<Link passHref href={'/handwriting-number-detection'}>*/}
				{/*	<Button*/}
				{/*		as={'a'}*/}
				{/*		colorScheme={'linkedin'}*/}
				{/*		rounded={'full'}*/}
				{/*	>*/}
				{/*		Handwriting Detection ✍*/}
				{/*	</Button>*/}
				{/*</Link>*/}
			</VStack>
		</VStack>
		<Box h={3}/>
		<Box position={'absolute'} bottom={10}>
			<Text fontSize={'sm'} textAlign={'center'}>
				© 2021 Noor Octavian Anwar
				<br/>
				All right reserved
			</Text>
		</Box>
	</Center>
}