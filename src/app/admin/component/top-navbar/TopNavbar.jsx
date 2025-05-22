'use client';
import './TopNavbar.css';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

const TopNavbar = ({ user }) => {
    return <Container_Top_Navbar user={user} />;
  };

const Container_Top_Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const iconRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setShowNotif(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="top-navbar">

      <div
        className="container-profile-top-navbar"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        ref={profileRef}
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile-img-top-navbar"
        />

        {showProfileMenu && (
          <div className="profile-dropdown-top-navbar">
            <div className="profile-header-top-navbar">
                <img src="https://i.pravatar.cc/60" alt="user" className="dropdown-avatar-top-navbar" />
                <div>
                    <p className="dropdown-email-top-navbar">adamjoe@email.com</p>
                </div>
            </div>

            <ul className="dropdown-menu-top-navbar">
                <li>
                    <FiUser className="menu-icon-top-navbar" />
                    Lihat Profil
                </li>
                <li>
                    <FiSettings className="menu-icon-top-navbar" />
                    Pengaturan
                </li>
                <li>
                    <FiLogOut className="menu-icon-top-navbar" />
                    Logout
                </li>
            </ul>

          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
