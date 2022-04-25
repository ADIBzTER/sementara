import { useEffect, useRef } from 'react';

import QrScanner from 'qr-scanner';

const Camera = () => {
  window.cameraStream = new MediaStream();

  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      window.cameraStream = stream;
      showCameraVideo();

      const qrScanner = new QrScanner(videoRef.current, (data) => {
        redirectToFile(data);

        qrScanner.destroy();
      });
      qrScanner.start();
    })();
  }, []);

  function showCameraVideo() {
    const video = videoRef.current;
    video.srcObject = window.cameraStream;

    video.onloadedmetadata = () => {
      video.play();
    };
    video.play();
  }

  function redirectToFile(data) {
    const searchParams = new URLSearchParams(data);
    const action = searchParams.get('action');
    const url = searchParams.get('url');

    if (action === 'send') {
      console.log('Send: ' + url);
    } else if (action === 'receive') {
      console.log('Receive: ' + url);
    }
  }

  return (
    <>
      <video ref={videoRef}></video>
    </>
  );
};

export default Camera;
