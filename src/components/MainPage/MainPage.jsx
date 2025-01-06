import './MainPage.scss';

export const MainPage = () => {
  return (
    <main className="main">
      <div className="main__paddings container">
          <div className="main__inner">
            <div className="main__inner_info">
              <h2 className="main__inner_info-title">Just sign up to win a smart watch.</h2>
              <p className="main__inner_info-text">Enter our monthly drawing 
                for a chance to win one of five smart watches. 
                Contest winners will be announced on the first day 
                of every month.
              </p>
              <button className="main__inner_info-button">I want to win!</button>
            </div>
            <div className="main__inner_image">
              <img src="img/watch.webp" alt="images" />
            </div>
          </div>
      </div>
    </main>
  );
}