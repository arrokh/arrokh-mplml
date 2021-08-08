import { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, IconButton, useBoolean } from '@chakra-ui/react';
import { FabricJSCanvas } from 'fabricjs-react';
import { fabric } from 'fabric';
import { CheckCircleIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const DrawerPlayground: FC = () => {
	const [isDrawingMode, setIsDrawingMode] = useBoolean(false);
	const [canvasHeight,] = useState(400);
	const [canvas, setCanvas] = useState<fabric.Canvas>();

	useEffect(() => {
		if (canvas) {
			setIsDrawingMode.on();
			canvas.setHeight(canvasHeight);
			canvas.freeDrawingBrush.width = 5;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canvas]);

	useEffect(() => {
		if (canvas)
			canvas.isDrawingMode = isDrawingMode;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDrawingMode])

	return <Box w={'100%'}>
		<Heading m={2} size={'sm'}>
			Drawer
		</Heading>
		<Box>
			<Box backgroundColor={'blackAlpha.50'} h={canvasHeight}>
				<FabricJSCanvas className="fabric-canvas" onReady={setCanvas}/>
			</Box>
			<Flex
				mt={3}
				justify={'end'}
				flexDirection={'row-reverse'}
			>
				<IconButton
					mr={2}
					rounded={'full'}
					colorScheme={'linkedin'}
					aria-label={'Close'}
					icon={<CloseIcon/>}
					onClick={() => canvas?.clear()}
				/>
				<Button
					mr={2}
					rounded={'full'}
					colorScheme={'linkedin'}
					aria-label={'Edit'}
					leftIcon={isDrawingMode ? <EditIcon/> : <CheckCircleIcon/>}
					onClick={setIsDrawingMode.toggle}
				>
					{isDrawingMode ? 'Drawing' : 'Edit'}
				</Button>
			</Flex>
		</Box>
	</Box>
}

export default DrawerPlayground;