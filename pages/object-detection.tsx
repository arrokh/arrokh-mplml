/*
	Resource: https://towardsdatascience.com/how-to-use-tensorflow-js-in-react-js-object-detection-98b3782f08c2
 */

import LayoutWrapper from '../components/layout/layout-wrapper';
import NavigationHeader from '../components/layout/navigation-header';
import ContentWrapper from '../components/layout/content-wrapper';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { ObjectDetection } from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, Container, useToast } from '@chakra-ui/react';

export default function Index() {
	const [model, setModel] = useState<ObjectDetection>();
	const webcamRef = useRef(null);
	const [clientSize, setClientSize] = useState<Array<number>>([]);
	const [timeOutId, setTimeOutId] = useState<any>();
	const toast = useToast();

	async function loadModel() {
		try {
			const modelLoaded = await cocoSsd.load();
			setModel(modelLoaded);
			console.log('set loaded Model');
			toast({
				description: 'Success loaded model',
				position: 'top',
				status: 'success',
				isClosable: true,
			});
		} catch (err) {
			console.log(err);
			console.log('failed load model');
			toast({
				description: 'Failed to load model',
				position: 'top',
				status: 'error',
				isClosable: true,
			});
		}
	}

	async function predictionFunction() {
		if (!model) {
			toast({
				description: 'Model is null',
				position: 'top',
				status: 'error',
				isClosable: true,
			});
			return;
		}

		const predictions = await model.detect((document.getElementById('img') as HTMLImageElement));
		const myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement;
		const ctx = myCanvas.getContext('2d');

		if (timeOutId) {
			clearTimeout(timeOutId);
			setTimeOutId(null);
			ctx?.clearRect(
				0,
				0,
				clientSize[0],
				clientSize[1],
			);
			return;
		}

		ctx?.clearRect(
			0,
			0,
			clientSize[0],
			clientSize[1],
		);

		if (predictions.length > 0) {
			for (let n = 0; n < predictions.length; n++) {
				if (predictions[n].score > 0.8) {
					let bboxLeft = predictions[n].bbox[0];
					let bboxTop = predictions[n].bbox[1];
					let bboxWidth = predictions[n].bbox[2];
					let bboxHeight = predictions[n].bbox[3];

					if (ctx) {
						ctx.beginPath();
						ctx.font = '15px Arial';
						ctx.fillStyle = '#00a0dc';

						ctx.fillText(
							predictions[n].class.toUpperCase() +
							': ' +
							Math.round(parseFloat(predictions[n].score.toString()) * 100) +
							'%',
							clientSize[0],
							clientSize[1],
						);

						ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
						ctx.strokeStyle = '#00a0dc';

						ctx.lineWidth = 2;
						ctx.stroke();
					}
				}
			}
		}

		const to = setTimeout(() => predictionFunction(), 500);
		setTimeOutId(to);
	}

	useEffect(() => {
		if (webcamRef !== null && webcamRef.current !== null) {
			// @ts-ignore
			const newClientSize = [webcamRef.current.video.clientWidth, webcamRef.current.video.clientHeight,];
			setClientSize(newClientSize);
		}

	}, [webcamRef, timeOutId]);

	useEffect(() => {
		tf.ready().then(() => {
			loadModel();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <LayoutWrapper>
		<NavigationHeader title={'Object Detection'}/>
		<ContentWrapper>
			<Box mx={'auto'} marginY={3}>
				<Button
					isLoading={!model}
					loadingText={'Loading model asset'}
					rounded={'full'}
					colorScheme={timeOutId ? 'red' : 'linkedin'}
					onClick={predictionFunction}
				>
					{timeOutId ? 'Stop' : 'Start'} Detection
				</Button>
			</Box>
			<Container centerContent>
				<canvas
					id="myCanvas"
					style={{
						// backgroundColor: '#ff000038',
						backgroundColor: 'transparent',
						zIndex: 999,
						position: 'absolute',
						width: clientSize[0],
						height: clientSize[1],
					}}
				/>
				<Webcam
					audio={false}
					id="img"
					ref={webcamRef}
					screenshotQuality={1}
					screenshotFormat="image/jpeg"
					videoConstraints={{
						facingMode: { ideal: 'environment' },
					}}
				/>
			</Container>
		</ContentWrapper>
	</LayoutWrapper>
}