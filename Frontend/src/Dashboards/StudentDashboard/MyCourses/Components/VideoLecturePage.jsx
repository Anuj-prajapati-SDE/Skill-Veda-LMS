import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VideoLecturePage.css";
import BackButton from "../../../../utilities/functions/BackButton";

const VideoLecturePage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [hideTab, setHideTab] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const { id } = useParams();
  const videoRef = useRef(null);
  const apiUrl = import.meta.env.VITE_Backend_URL;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/admin/getcourseById/${id}`)
      .then((response) => {
        if (response.data && response.data.lectures.length > 0) {
          setLectures(response.data.lectures);
          // Set the first lecture as the default when lectures are loaded
          setCurrentVideo(response.data.lectures[0]);
        }
      })
      .catch((error) => console.error("Error fetching course:", error));
  }, [id]);

  const extractVideoId = (url) => {
    if (!url) return null;
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|embed\/|shorts\/))([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Create a function to load the YouTube API script
  const loadYouTubeAPI = () => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);

    window.ytApiLoading = true;

    window.onYouTubeIframeAPIReady = () => {
      window.ytApiReady = true;
      // Move createPlayer call here to ensure it runs after API is ready
      if (currentVideo && currentVideo.lectureLink) {
        createPlayer();
      }
    };
  };

  // Function to create the YouTube player
  const createPlayer = () => {
    const videoId = extractVideoId(currentVideo.lectureLink);
    if (!videoId) return;

    videoRef.current = new YT.Player("youtube-player", {
      videoId,
      playerVars: {
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        origin: "https://yourdomain.com", // Replace with your actual domain
      },
      events: {
        onReady: (event) => event.target.playVideo(),
      },
    });
  };

  useEffect(() => {
    if (!window.ytApiLoading) {
      loadYouTubeAPI();
    }
  }, []);

  // This useEffect might not be necessary anymore since we're handling
  // video loading in onYouTubeIframeAPIReady
  useEffect(() => {
    if (window.ytApiReady && currentVideo && currentVideo.lectureLink) {
      if (videoRef.current) {
        videoRef.current.cueVideoById(extractVideoId(currentVideo.lectureLink));
      } else {
        createPlayer();
      }
    }
  }, [currentVideo]);

  const [playing, setPlaying] = useState(true);

  const playPauseVideo = () => {
    if (videoRef.current) {
      const state = videoRef.current.getPlayerState();
      if (state === 1) {
        videoRef.current.pauseVideo();
        setPlaying(false);
      } else {
        videoRef.current.playVideo();
        setPlaying(true);
      }
    }
  };

  const [isMuted, setIsMuted] = useState(false);
  const muteUnmuteVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.isMuted()) {
        videoRef.current.unMute();
        setIsMuted(false);
      } else {
        videoRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const setVolume = (volume) => {
    if (videoRef.current) {
      videoRef.current.setVolume(volume);
    }
  };

  const seekVideo = (seconds) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.getCurrentTime();
      videoRef.current.seekTo(currentTime + seconds, true);
    }
  };

  const handleNextVideo = () => {
    const currentIndex = lectures.findIndex((v) => v === currentVideo);
    setCurrentVideo(
      lectures[(currentIndex + 1 + lectures.length) % lectures.length]
    );
  };

  const handlePreviousVideo = () => {
    const currentIndex = lectures.findIndex((v) => v === currentVideo);
    setCurrentVideo(
      lectures[(currentIndex - 1 + lectures.length) % lectures.length]
    );
  };

  return (
    <>
      <div className="admin-courses-header">
        <h2>
          {" "}
          <BackButton path="/userdashboard/my-courses" /> Lectures
        </h2>
      </div>

      <div className="video-lecture-page">
        <div className="video-player">
          <div id="youtube-player"></div>
          <div className="video-controls">
            <div className="video-navigation-buttons">
              <button className="video-button" onClick={handlePreviousVideo}>
                <i className="fa-solid fa-backward-step"></i>
              </button>
              <button className="video-button" onClick={() => seekVideo(-10)}>
                <i className="fa-solid fa-angles-left"></i>
              </button>
              <button className="video-button" onClick={playPauseVideo}>
                {playing ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
              <button className="video-button" onClick={() => seekVideo(10)}>
                <i className="fa-solid fa-angles-right"></i>
              </button>
              <button className="video-button" onClick={handleNextVideo}>
                <i className="fa-solid fa-forward-step"></i>
              </button>
            </div>
            <div className="volume">
              <button className="video-button" onClick={muteUnmuteVideo}>
                {isMuted ? (
                  <i className="fa-solid fa-volume-mute"></i>
                ) : (
                  <i className="fa-solid fa-volume-high"></i>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                onChange={(e) => setVolume(e.target.value)}
              />
            </div>
          </div>
          <div className="video-details-tab">
            <div className="video-tab-header">
              <button
                onClick={() => setActiveTab("tab1")}
                className={`tabs ${activeTab === "tab1" && "active"
                  } secondary-button`}
              >
                Overview
              </button>
              <button
                onClick={() => setHideTab(!hideTab)}
                className={`video-button close`}
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
            <div className={`video-description ${hideTab && "collapse"}`}>
              {activeTab === "tab1" && (
                <>
                  <h1>
                    {currentVideo ? currentVideo.lectureName : "Loading..."}
                  </h1>
                  <p>
                    {currentVideo
                      ? currentVideo.lectureDescription
                      : "Loading..."}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className=" video-list">
          <h5 className="mb-3">Next Videos</h5>
          <div className="video-list-container">
            {lectures.map((video) => (
              <div
                key={video._id}
                className="video-item d-flex align-items-center"
                onClick={() => setCurrentVideo(video)}
              >
                <img
                  src={video.lectureImage}
                  alt={video.lectureName}
                  className="thumbnail"
                />
                <div className="video-info">
                  <h6>{video.lectureName}</h6>
                  {/* <span className="video-duration">
                    {video.lectureDescription}
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoLecturePage;
