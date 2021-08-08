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
import { Box, Button } from '@chakra-ui/react';

export default function Index() {
	const [model, setModel] = useState<ObjectDetection>();
	const webcamRef = useRef(null);
	const [camWidth, camHeight] = [350, 500];
	const [timeOutId, setTimeOutId] = useState<any>();

	async function loadModel() {
		try {
			const modelLoaded = await cocoSsd.load();
			setModel(modelLoaded);
			console.log('set loaded Model');
		} catch (err) {
			console.log(err);
			console.log('failed load model');
		}
	}

	async function predictionFunction() {
		if (!model)
			return;


		const predictions = await model.detect((document.getElementById('img') as HTMLImageElement));
		const myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement;
		const ctx = myCanvas.getContext('2d');

		if (timeOutId) {
			clearTimeout(timeOutId);
			setTimeOutId(null);
			ctx?.clearRect(
				0,
				0,
				camWidth,
				camHeight
			);
			return;
		}

		const video = ((webcamRef?.current) as unknown as { video: any })?.video;
		if (video)
			ctx?.clearRect(
				0,
				0,
				video.videoWidth,
				video.videoHeight
			);

		if (predictions.length > 0) {
			for (let n = 0; n < predictions.length; n++) {
				if (predictions[n].score > 0.8) {
					let bboxLeft = predictions[n].bbox[0];
					let bboxTop = predictions[n].bbox[1];
					let bboxWidth = predictions[n].bbox[2];
					let bboxHeight = predictions[n].bbox[3] - bboxTop;

					if (ctx) {
						ctx.beginPath();
						ctx.font = '15px Arial';
						ctx.fillStyle = '#00a0dc';

						ctx.fillText(
							predictions[n].class.toUpperCase() +
							': ' +
							Math.round(parseFloat(predictions[n].score.toString()) * 100) +
							'%',
							bboxLeft,
							bboxTop
						);

						ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
						ctx.strokeStyle = '#00a0dc';

						ctx.lineWidth = 2;
						ctx.stroke();
					}
				}
			}
		}

		const to = setTimeout(() => predictionFunction(), 1000);
		setTimeOutId(to);
	}

	useEffect(() => {
		tf.ready().then(() => {
			loadModel();
		});
	}, []);

	return <LayoutWrapper>
		<NavigationHeader title={'Object Detection'}/>
		<ContentWrapper>
			<Box mx={'auto'} my={3}>
				<canvas
					id="myCanvas"
					width={camWidth}
					height={camHeight}
					style={{
						backgroundColor: 'transparent',
						zIndex: 999,
						position: 'absolute',
					}}
				/>
				<Webcam
					audio={false}
					id="img"
					ref={webcamRef}
					screenshotQuality={1}
					screenshotFormat="image/jpeg"
					videoConstraints={{
						width: { ideal: camWidth },
						height: { ideal: camHeight },
					}}
				/>
			</Box>
			<Box mx={'auto'}>
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
		</ContentWrapper>
	</LayoutWrapper>
}