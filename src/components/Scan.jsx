import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import ShowRecipe from "./ShowRecipe";

const Scan = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [fruitInfo, setFruitInfo] = useState([
    { className: "Ripe Banana", probability: 0.6334966421127319 },
  ]);
  const [top1Fruit, setTop1Fruit] = useState("");
  const [top2Fruit, setTop2Fruit] = useState("");
  const [top1FruitProbability, setTop1FruitProbability] = useState(0);
  const [top2FruitProbability, setTop2FruitProbability] = useState(0);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = process.env.PUBLIC_URL + "/model/model.json";
        const metadataURL = process.env.PUBLIC_URL + "/model/metadata.json";

        const model = await tf.loadLayersModel(modelURL);
        setModel(model);
        const metadata = await fetch(metadataURL).then((response) =>
          response.json()
        );
        setMetadata(metadata);
        setModelLoaded(true);
        console.log("Model loaded.");
      } catch (error) {
        console.error("Error loading model", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (modelLoaded) {
      // Wait for a bit after the model is loaded before running runModel
      const timer = setTimeout(() => {
        runModel();
      }, 1000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [modelLoaded]);

  const runModel = async () => {
    const detectAndScheduleNextFrame = async () => {
      if (model) {
        // Ensure model is loaded
        await detect();
        setTimeout(detectAndScheduleNextFrame, 1000); // Schedule next after completion
      } else {
        console.log("Model", model);
        console.log("Model not loaded yet. Waiting...");
        setTimeout(detectAndScheduleNextFrame, 1000); // Retry after some time
      }
    };
    detectAndScheduleNextFrame(); // Start the loop
  };

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    )
      try {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const tfVideo = tf.browser.fromPixels(video);
        const resized = tf.image.resizeBilinear(tfVideo, [224, 224]);
        const normalized = resized.div(255.0).expandDims(0);
        const predictions = await model.predict(normalized);

        const topK = 3; // for example, to get top 3 predictions
        const { values, indices } = tf.topk(predictions, topK);
        const classesIndices = Array.from(indices.dataSync());
        const probabilities = Array.from(values.dataSync());

        const classes = classesIndices.map((index) => metadata.labels[index]);
        const classProbabilities = classes.map((className, i) => ({
          className,
          probability: probabilities[i],
        }));

        console.log(classProbabilities);

        if (classProbabilities != null && classProbabilities.length > 0) {
          console.log("set new fruits");
          setTop1Fruit(classProbabilities[0].className);
          setTop2Fruit(classProbabilities[1].className);
          setTop1FruitProbability(classProbabilities[0].probability);
          setTop2FruitProbability(classProbabilities[1].probability);

          setFruitInfo(classProbabilities);
        }

        const numDetections = predictions.shape[1];
        const predictionArray = await predictions.array();

        console.log(predictionArray);

        const boxes = [];
        for (let i = 0; i < numDetections; i++) {
          const [y_min, x_min, y_max, x_max, score, classId] =
            predictionArray[i];
          console.log(predictionArray[i]);
          if (score > 0.00000001) {
            const bbox = {
              yMin: y_min,
              xMin: x_min,
              yMax: y_max,
              xMax: x_max,
            };
            const className = metadata.labels[classId];
            boxes.push({ bbox, className, score });
          }
        }

        console.log(boxes);

        tfVideo.dispose();
        resized.dispose();
        normalized.dispose();
        predictions.dispose();
      } catch (e) {
        console.log("Error with predictions");
        console.log(e);
      }
  };

  const videoConstraints = {
    facingMode: "environment",
  };

  return (
    <div className="pt-[120px]">
      <Webcam
        ref={webcamRef}
        muted={true}
        className="rounded-lg"
        style={{
          position: "flex",
          zindex: 9,
          width: "100%",
          height: 380,
        }}
        videoConstraints={videoConstraints}
      />
      <div className="m-3 py-8 px-10 mb-28 bg-pale-green shadow-md rounded-md justify-center max-w-screen-lg w-full ">
        <div className="flex items-center justify-between mb-2">
          <h2>Fruit Ripeness Predictions</h2>
        </div>
        <div className="mb-2">
          <p className="flex items-center justify-between text-dark-brown">
            <span className="flex items-center ">
              <span className="ml-2">{top1Fruit}</span>
            </span>
            <span className="font-bold">
              {(Math.round(top1FruitProbability * 10000) / 100).toFixed(2)}%
            </span>
          </p>
          <div className="w-full rounded-b-full h-2.5">
            <div
              className="bg-dark-green rounded-b-full h-2.5"
              style={{ width: `${Math.round(top1FruitProbability * 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-2">
          <p className="flex items-center justify-between text-dark-brown">
            <span className="flex items-center ">
              <span className="ml-2">{top2Fruit}</span>
            </span>
            <span className="font-bold">
              {(Math.round(top2FruitProbability * 10000) / 100).toFixed(2)}%
            </span>
          </p>
          <div className="bg-dark-green rounded-b-full h-2.5">
            <div
              className="w-full rounded-b-full h-2.5"
              style={{ width: `${Math.round(top2FruitProbability * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* <ShowRecipe product={top1Fruit} /> */}
    </div>
  );
};

export default Scan;
