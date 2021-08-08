import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import LayoutWrapper from '../components/layout/layout-wrapper';
import DrawerPlayground from '../components/core/drawer-playground';
import NavigationHeader from '../components/layout/navigation-header';
import ContentWrapper from '../components/layout/content-wrapper';

export default function Index() {
	return <LayoutWrapper>
		<NavigationHeader title={'Handwriting Detection'}/>
		<ContentWrapper>
			<VStack>
				<Box>
					<Heading m={2} size={'sm'}>
						Prediction
					</Heading>
					<Box backgroundColor={'blackAlpha.50'} minH={120}>
						<Center h={'inherit'} p={6}>
							Warp quickly like a delighted moon.Creatures are the crewmates of the intelligent ionic
							cannon.
						</Center>
					</Box>
				</Box>
				<DrawerPlayground/>
			</VStack>
		</ContentWrapper>
	</LayoutWrapper>
}