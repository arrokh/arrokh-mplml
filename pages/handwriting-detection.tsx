import { Box, Center, Heading } from '@chakra-ui/react';
import LayoutWrapper from '../components/layout/layout-wrapper';
import DrawerPlayground from '../components/core/drawer-playground';
import NavigationHeader from '../components/layout/navigation-header';
import ContentWrapper from '../components/layout/content-wrapper';

export default function Index() {
	return <LayoutWrapper>
		<NavigationHeader title={'Handwriting Detection'}/>
		<ContentWrapper>
			<Box>
				<Heading m={2} size={'sm'}>
					Content
				</Heading>
				<Box backgroundColor={'blackAlpha.50'} h={200}>
					<Center h={'inherit'} p={6}>
						Warp quickly like a delighted moon.Creatures are the crewmates of the intelligent ionic cannon.
					</Center>
				</Box>
			</Box>
			<DrawerPlayground/>
		</ContentWrapper>
	</LayoutWrapper>
}