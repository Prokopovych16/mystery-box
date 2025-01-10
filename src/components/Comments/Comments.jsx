import './Comments.scss'
import comments from '../../api/comments.json';
import { useState, useEffect } from 'react';
import translations from '../../api/languages.json';

export const Comments = ({ currentLang }) => {
  const chosenLanguage = translations[currentLang];

  function timeAgo(dateString) {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} ${chosenLanguage.secondsText} ${chosenLanguage.agoText}`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${chosenLanguage.minutesText} ${chosenLanguage.agoText}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${chosenLanguage.hoursText} ${chosenLanguage.agoText}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${chosenLanguage.daysText} ${chosenLanguage.agoText}`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} ${chosenLanguage.weeksText} ${chosenLanguage.agoText}`;
    }
  }

  const [commentsState, setCommentsState] = useState(comments);
  const [likedComments, setLikedComments] = useState(() => {
    const savedLikes = localStorage.getItem('likedComments');
    return savedLikes ? JSON.parse(savedLikes) : [];
  });
  const [dislikedComments, setDislikedComments] = useState(() => {
    const savedDislikes = localStorage.getItem('dislikedComments');
    return savedDislikes ? JSON.parse(savedDislikes) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedComments', JSON.stringify(likedComments));
  }, [likedComments]);

  useEffect(() => {
    localStorage.setItem('dislikedComments', JSON.stringify(dislikedComments));
  }, [dislikedComments]);

  const handleLikeClick = (id) => {
    if (likedComments.includes(id)) {
      setLikedComments((prev) => prev.filter((likedId) => likedId !== id));
      setCommentsState((prevState) =>
        prevState.map((comment) =>
          comment.id === id ? { ...comment, likes: comment.likes - 1 } : comment
        )
      );
    } else {
      if (dislikedComments.includes(id)) {
        setDislikedComments((prev) =>
          prev.filter((dislikedId) => dislikedId !== id)
        );
        setCommentsState((prevState) =>
          prevState.map((comment) =>
            comment.id === id
              ? {
                ...comment,
                dislikes: comment.dislikes - 1,
                likes: comment.likes + 1,
              }
              : comment
          )
        );
      } else {
        setCommentsState((prevState) =>
          prevState.map((comment) =>
            comment.id === id
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        );
      }
      setLikedComments((prev) => [...prev, id]);
    }
  };

  const handleDislikeClick = (id) => {
    if (dislikedComments.includes(id)) {
      setDislikedComments((prev) =>
        prev.filter((dislikedId) => dislikedId !== id)
      );
      setCommentsState((prevState) =>
        prevState.map((comment) =>
          comment.id === id
            ? { ...comment, dislikes: comment.dislikes - 1 }
            : comment
        )
      );
    } else {
      if (likedComments.includes(id)) {
        setLikedComments((prev) => prev.filter((likedId) => likedId !== id));
        setCommentsState((prevState) =>
          prevState.map((comment) =>
            comment.id === id
              ? {
                ...comment,
                likes: comment.likes - 1,
                dislikes: comment.dislikes + 1,
              }
              : comment
          )
        );
      } else {
        setCommentsState((prevState) =>
          prevState.map((comment) =>
            comment.id === id
              ? { ...comment, dislikes: comment.dislikes + 1 }
              : comment
          )
        );
      }
      setDislikedComments((prev) => [...prev, id]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openImageModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };


  return (
    <div className="comments container">
      <div className="comments__form">
        <form className="comments__form_inner">
          <textarea placeholder={chosenLanguage.textAreaPlaceholder} className="comments__form_inner_textarea"></textarea>
          <button className="comments__form_inner_button">{chosenLanguage.textAreaSend}</button>
        </form>
      </div>
      <div className="comments__line"></div>
      <div className="comments__info">
        <div className="comments__info_comment_statistics">
          <h1>{chosenLanguage.commentsText}</h1>
          <div><p>{comments.length}</p></div>
        </div>
        {commentsState.map(comment => {
          return (
            <>
              <div className="comments__info_comment">
                <div className="comments__info_comment_img">
                  <img className="comments__info_comment_img_i" src={comment.photo} alt='' />
                </div>
                <div className="comments__info_comment_text">
                  <div className="comments__info_comment_text_general">
                    <div className="comments__info_comment_text_general_title">
                      <h3>{comment.fullName}</h3>
                      <p>{timeAgo(comment.timePosted)}</p>
                    </div>
                    <div className="comments__info_comment_text_general_grades">
                      {[...Array(5)].map((_, index) => (
                        <img
                          key={index}
                          src={
                            index < comment.rating
                              ? "img/icons/star-active.svg"
                              : "img/icons/star.svg"
                          }
                          alt={index < comment.rating ? "Active star" : "Inactive star"}
                          className="comments__star"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="comments__info_comment_text_mainText">
                    <p>{comment.text}</p>
                    <div className="comments__info_comment_text_mainText_imgs">
                      {comment.uploadedPhotos.map(photo => {
                        return (
                          <div
                            key={photo}
                            className="comments__info_comment_text_mainText_imgs_img"
                            onClick={() => openImageModal(photo)}
                          >
                            <img src={photo} alt="pho" />
                          </div>
                        );
                      })}
                    </div>

                    {isModalOpen && (
                      <div className={`modal ${isModalOpen ? 'open' : ''}`} onClick={closeImageModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                          <span className="modal-close" onClick={closeImageModal}>×</span>
                          <img src={currentImage} alt="large" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="comments__info_comment_text_likes">
                    <div
                      className="comments__info_comment_text_likes_like"
                      onClick={() => handleLikeClick(comment.id)}
                    >
                      <img
                        src={likedComments.find(like => like === comment.id) ? "img/icons/like-active.svg" : "img/icons/like.svg"}
                        alt="like"
                      />
                      <p
                        className={likedComments.find(like => like === comment.id) ? "comments__info_comment_text_likes_like-active" : "img/icons/like.svg"}
                      >
                        {comment.likes}
                      </p>
                    </div>
                    <div
                      className="comments__info_comment_text_likes_dislike"
                      onClick={() => handleDislikeClick(comment.id)}
                    >
                      <img
                        src={dislikedComments.find(disLike => disLike === comment.id) ? "img/icons/dislike-active.svg" : "img/icons/dislike.svg"}
                        alt="dislike"
                      />
                      <p
                        className={dislikedComments.find(like => like === comment.id) ? "comments__info_comment_text_likes_like-active" : "img/icons/like.svg"}
                      >
                        {comment.dislikes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="comments__info_line"></div>
            </>
          );
        })}
      </div>
    </div>
  );
}
