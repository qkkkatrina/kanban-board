import React, { useState } from 'react';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="header__logo">Kanban</div>
      <div className="header__user" onClick={toggleMenu}>
        <div className="header__user-avatar">AD</div> {/* Инициалы пользователя */}
        <span>Admin</span>
        <span className={`header__user-arrow ${isMenuOpen ? 'open' : ''}`}>▾</span>
        {isMenuOpen && <UserMenu />}
      </div>
    </header>
  );
};

export default Header;