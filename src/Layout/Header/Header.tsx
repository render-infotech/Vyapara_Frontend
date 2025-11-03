import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import { dynamicImage } from '../../Service';
import CloseButton from './CloseButton/CloseButton';
import MainHeader from './MainHeader/MainHeader';

const Header = () => {
  return (
    <header className="page-header row">
      <div className="logo-wrapper d-flex align-items-center col-auto">
        <Link
          to={`${process.env.PUBLIC_URL}/dashboard`}
          className="mx-2"
        >
          <Image
            className="for-light img-fluid"
            src={dynamicImage('vyapara/logo_H_2-removebg.png')}
            alt="logo"
          />
          <Image
            className="for-dark"
            src={dynamicImage('vyapara/logo_H_2-removebg.png')}
            alt="logo"
          />
        </Link>
        <CloseButton />
      </div>
      <MainHeader />
    </header>
  );
};

export default Header;
