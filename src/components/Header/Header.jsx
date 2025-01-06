import './Header.scss'

export const Header = () => {
  const textForTimer = 'January 07, 2025';

  return (
    <header className="header">
        <div className="header__inner">
          <div className="header__inner_topText"><p>Survey About</p></div>
          <div className="header__inner_logo"><h1>SEPHORA</h1></div>
          <div className="header__inner_timerText"><p>{textForTimer}</p></div>
        </div>
    </header>
  );
}