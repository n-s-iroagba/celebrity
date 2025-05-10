import React from "react";
import { Row, Col } from "react-bootstrap";
import ActionButton from "./ActionButton";
import {
  faCommentDots,
  faVideo,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";

const VideoSection: React.FC = () => {
  return (
    <section className="py-4">
      <Row className="d-flex flex-column-reverse flex-lg-row  ">
        {/* Text Column */}
        <Col lg={6} className="d-flex flex-column">
          <div className="my-3">
            <FontAwesomeIcon icon={faSpeakerDeck} size="2x" />
            <h3 className="">
              Send Any of the following to your favorite stars.
            </h3>
            <p className="mb-0">Click the button below to get started.</p>
          </div>
          <div className="mt-3 ">
            <FontAwesomeIcon icon={faCommentDots} />
            <h5 className="">Text Messages.</h5>
            <p className="">
              Share your thoughts in heartfelt written messages.
            </p>
          </div>

          <div className="mt-3  ">
            <FontAwesomeIcon icon={faVideo} />
            <h5 className="">Video Clips.</h5>
            <p className="mb-0">
              Express yourself through personal video messages.
            </p>
          </div>

          <div className="my-3 ">
            <FontAwesomeIcon icon={faMicrophone} />
            <h5 className="">Voice Notes.</h5>
            <p className="mb-0">
              Send authentic audio messages with your unique voice.
            </p>
          </div>
          <div>
            <ActionButton />
          </div>
        </Col>

        {/* Video Column */}
        <Col lg={6} className="text-center ">
          <video
            loop
            autoPlay
            muted
            playsInline
            style={{ width: "100%", borderRadius: "8px" }}
          >
            <source src="/videos/magicvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Col>
      </Row>
    </section>
  );
};

export default VideoSection;
