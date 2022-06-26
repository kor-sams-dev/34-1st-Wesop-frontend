import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import NavigationModal from './NavigationModal/NavigationModal';
import './Navigation.scss';

const Navigation = props => {
  const [mockNavMenu, setMockNavMenu] = useState([]);

  const [navClosingBtn, setNavClosingBtn] = useState(false);

  //사용자가 클릭한 메뉴의 고유 번호 : selectedMenu
  const [selectedMenu, setSelectedMenu] = useState(0);

  //사용자가 클릭한 메뉴에 해당되는 객체 불러오기 : mockSelectedMenu
  const [mockSelectedMenu, setMockSelectedMenu] = useState(
    mockNavMenu[Number(selectedMenu)]
  );

  const [selectedMenuBgColor, setSelectedMenuBgColor] = useState('#fffef2');

  const backgroundColorChange = selectedMenu => {
    setSelectedMenuBgColor(
      MODAL_BG_COLORS_AND_IMAGES[selectedMenu - 1].backgroundColor
    );
  };

  const [selectedMenuImage, setSelectedMenuImage] =
    useState('./images/skincare');

  const modalImageChange = selectedMenu => {
    setSelectedMenuImage(MODAL_BG_COLORS_AND_IMAGES[selectedMenu - 1].image);
  };

  const [activeAnimation, setActiveAnimation] = useState('');

  const activeAnimationModal = () => {
    setActiveAnimation('animation');
  };

  const modalChange = modal => {
    setNavClosingBtn(modal);
  };

  const modalReturnToOrigin = modal => {
    setSelectedMenu(0);
    setNavClosingBtn(modal);
  };

  const navClosingButtonControl = () => {
    modalChange();
    modalReturnToOrigin();
  };

  useEffect(() => {
    fetch('/data/categories.json')
      .then(res => res.json())
      .then(data => {
        setMockNavMenu(data);
      });
  }, []);

  return (
    <>
      <nav className={`navBox ${selectedMenu !== 0 && 'white'}`}>
        <ul className="navPrimaryMenu">
          <li className="navPrimaryMenuItem">
            <Link to="/" className="wesopLogo">
              Wēsop
            </Link>
          </li>
          {mockNavMenu.map(({ id, name }) => {
            return (
              <li
                className={`navPrimaryMenuItem ${
                  selectedMenu === id && 'highlight'
                }`}
                key={id}
              >
                <button
                  className="navMenuLink"
                  onClick={() => {
                    setSelectedMenu(id);
                    modalChange(true);
                    setMockSelectedMenu(id);
                    backgroundColorChange(id);
                    modalImageChange(id);
                    activeAnimationModal(true);
                  }}
                  onMouseLeave={() => {
                    setActiveAnimation('');
                  }}
                >
                  {name}
                </button>
              </li>
            );
          })}
          <li className="navPrimaryMenuItem">
            <Link to="" className="navMenuLink">
              스토어
            </Link>
          </li>
          <li className="navPrimaryMenuItem">
            <Link to="" className="navMenuLink">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="navIcon" />
            </Link>
          </li>

          {navClosingBtn && (
            <li className="navPrimaryMenuItem">
              <button
                className="navClosingButton"
                onClick={navClosingButtonControl}
              >
                <span>닫기</span>
                <FontAwesomeIcon icon={faXmark} className="navIcon" />
              </button>
            </li>
          )}
        </ul>
        <ul className="navSecondMenu">
          <li className="navSecondMenuItem">
            <button className="loginButton">로그인</button>
          </li>
          <li className="navSecondMenuItem">
            <button className="signUpButton">회원가입</button>
          </li>
          <li className="navSecondMenuItem">
            <button className="cartButton">카트</button>
          </li>
        </ul>
      </nav>
      {navClosingBtn && (
        <NavigationModal
          mockNavMenu={mockNavMenu}
          selectedMenu={selectedMenu}
          mockSelectedMenu={mockSelectedMenu}
          modalBgColor={selectedMenuBgColor}
          selectedMenuImage={selectedMenuImage}
          activeAnimation={activeAnimation}
        />
      )}
    </>
  );
};

const MODAL_BG_COLORS_AND_IMAGES = [
  {
    id: 1,
    backgroundColor: '#f1efe0',
    image: './images/skincare.jpg',
  },
  {
    id: 2,
    backgroundColor: '#ece3d2',
    image: './images/bodyhand.jpg',
  },
  {
    id: 3,
    backgroundColor: '#ddd8d4',
    image: './images/hair2.jpg',
  },
  {
    id: 4,
    backgroundColor: '#f5ece3',
    image: './images/perfume.jpg',
  },
  {
    id: 5,
    backgroundColor: '#f6f1eb',
    image: './images/home.jpg',
  },
  {
    id: 6,
    backgroundColor: '#e9efe3',
    image: './images/travel.jpg',
  },
  {
    id: 7,
    backgroundColor: '#eaeade',
    image: './images/giftguide.jpg',
  },
  {
    id: 8,
    backgroundColor: '#fefef2',
    image: './images/read.jpg',
  },
];

export default Navigation;
