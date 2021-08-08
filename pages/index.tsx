import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Index() {
	return <VStack
		justifyContent={'center'}
		p={6}
		spacing={12}
		minH={'90vh'}
	>
		<Heading
			fontWeight={0}
			textAlign={'center'}
		>
			My Projects Learning <br/>
			Machine Learning<br/>
			Give It Try<br/>
			🚀

		</Heading>
		<Text textAlign={'center'}>
			Cum elogium peregrinatione, omnes aususes carpseris fidelis, placidus decores.
			Talis, alter hydras sensim quaestio de regius, superbus mortem.Elogiums experimentum!
			Epos volares, tanquam noster quadra.Armariums ire in tornacum!Ubi est rusticus habitio?
		</Text>
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
			<Link passHref href={'/handwriting-number-detection'}>
				<Button
					as={'a'}
					colorScheme={'linkedin'}
					rounded={'full'}
				>
					Handwriting Detection ✍
				</Button>
			</Link>
		</VStack>
	</VStack>
}