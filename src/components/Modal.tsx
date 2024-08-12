import React from "react";
import { Modal } from "antd";

interface MovieModalProps {
  visible: boolean;
  onClose: () => void;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const MovieModal: React.FC<MovieModalProps> = ({
  visible,
  onClose,
  Poster,
  Title,
  Type,
  Year,
  imdbID,
}) => {
  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="movie-modal-content">
        <h2 className="movie-modal-title">{Title}</h2>{" "}
        <img src={Poster} alt={Title} className="movie-modal-image" />
        <p className="movie-modal-text">
          <span>Year:</span> {Year}
        </p>
        <p className="movie-modal-text">
          <span>Type:</span> {Type}
        </p>
        <p className="movie-modal-text">
          <span>IMDB ID:</span> {imdbID}
        </p>
      </div>
    </Modal>
  );
};

export default MovieModal;
