import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DiamondButton from "../components/DiamondButton";
import cameraIcon from "../assets/camera-icon.png";

export default function Camera() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || "";
  const city = location.state?.city || "";

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(0);

  const [stage, setStage] = useState("setup");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    let active = true;
    const requestId = ++requestRef.current;

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Your browser does not support camera access.");
        setStage("error");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (!active || requestRef.current !== requestId) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setStage("live");
      } catch (err) {
        if (!active) return;

        if (err.name === "NotAllowedError") {
          setError(
            "Camera access was denied. Allow camera permission in your browser settings.",
          );
        } else if (err.name === "NotFoundError") {
          setError("No camera was found on this device.");
        } else if (err.name === "NotReadableError") {
          setError("Your camera is being used by another application.");
        } else {
          setError("Unable to start the camera. Please try again.");
        }

        setStage("error");
      }
    };

    startCamera();

    return () => {
      active = false;
      requestRef.current += 1;
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (stage !== "live" || !videoRef.current) return;

    const video = videoRef.current;
    video.srcObject = streamRef.current;

    video.play().catch(() => {
      setError("Unable to play the camera preview.");
      setStage("error");
      stopCamera();
    });
  }, [stage]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const takePicture = () => {
    const video = videoRef.current;

    if (!video?.videoWidth || !video?.videoHeight) {
      setError("Camera is not ready. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture this photo.");
      return;
    }

    context.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Unable to save your photo.");
          return;
        }

        const file = new File([blob], `skinstric-photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        setPhoto(file);
        setPreviewUrl(URL.createObjectURL(file));
        stopCamera();
        setStage("preview");
      },
      "image/jpeg",
      0.9,
    );
  };

  const retakePicture = async () => {
    setPhoto(null);
    setPreviewUrl(null);
    setError("");
    setStage("setup");

    const requestId = ++requestRef.current;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user" },
      });

      if (requestId !== requestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      setStage("live");
    } catch {
      setError("Unable to restart the camera.");
      setStage("error");
    }
  };

  const usePhoto = () => {
    if (!photo) return;

    stopCamera();

    navigate("/analysis-loading", {
      state: {
        name,
        city,
        imageFile: photo,
      },
    });
  };

  const handleBack = () => {
    requestRef.current += 1;
    stopCamera();

    navigate("/image-selection", {
      state: { name, city },
    });
  };

  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] flex-col bg-white">
      {stage === "setup" && (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="relative flex h-[min(80vw,390px)] w-[min(80vw,390px)] items-center justify-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="diamond-outline diamond-outline-one" />
              <div className="diamond-outline diamond-outline-two" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-5">
              <img
                src={cameraIcon}
                alt=""
                className="h-24 w-24 object-contain"
              />

              <p className="text-sm font-semibold text-[#A0A0A0]">
                SETTING UP CAMERA...
              </p>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-[#1A1B1C]">
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>

            <div className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-3">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>
          </div>
        </div>
      )}

      {stage === "live" && (
        <div className="relative min-h-[calc(100dvh-64px)] flex-1 overflow-hidden bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute right-5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-4 text-white sm:right-10">
            <span className="text-xs font-semibold">TAKE PICTURE</span>

            <button
              type="button"
              aria-label="Take picture"
              onClick={takePicture}
              className="pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white/20 transition-transform hover:scale-110"
            >
              <span className="h-9 w-9 rounded-full border-2 border-white bg-white" />
            </button>
          </div>

          <div className="pointer-events-none absolute bottom-28 left-1/2 z-10 w-full max-w-[650px] -translate-x-1/2 px-4 text-center text-xs text-white">
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>
          </div>
        </div>
      )}

      {stage === "preview" && previewUrl && (
        <div className="relative min-h-[calc(100dvh-64px)] flex-1 overflow-hidden bg-black">
          <img
            src={previewUrl}
            alt="Captured photo preview"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <p className="absolute left-1/2 top-[18%] z-10 -translate-x-1/2 text-sm font-semibold text-white">
            GREAT SHOT!
          </p>

          <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-6">
            <p className="text-sm font-semibold text-white">Preview</p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={retakePicture}
                className="cursor-pointer bg-white px-5 py-3 text-xs font-semibold text-[#1A1B1C]"
              >
                RETAKE
              </button>

              <button
                type="button"
                onClick={usePhoto}
                className="cursor-pointer bg-[#1A1B1C] px-5 py-3 text-xs font-semibold text-white"
              >
                USE THIS PHOTO
              </button>
            </div>

            <p className="max-w-[300px] text-center text-[11px] text-white">
              Using this photo will send it to the A.I. analysis service.
            </p>
          </div>
        </div>
      )}

      {stage === "error" && (
        <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center gap-6 px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#1A1B1C]">
            CAMERA UNAVAILABLE
          </h2>

          <p role="alert" className="max-w-[350px] text-sm text-[#606B7D]">
            {error}
          </p>

          <button
            type="button"
            onClick={retakePicture}
            className="cursor-pointer bg-[#1A1B1C] px-6 py-3 text-xs font-semibold text-white"
          >
            TRY AGAIN
          </button>
        </div>
      )}

      {error && stage === "live" && (
        <p
          role="alert"
          className="absolute top-4 left-1/2 z-20 -translate-x-1/2 bg-black px-4 py-2 text-xs text-white"
        >
          {error}
        </p>
      )}

      <div
        className={`absolute bottom-8 left-8 z-20 ${
          stage === "live" || stage === "preview" ? "text-white" : ""
        }`}
      >
        <DiamondButton direction="left" label="BACK" onClick={handleBack} />
      </div>
    </main>
  );
}
