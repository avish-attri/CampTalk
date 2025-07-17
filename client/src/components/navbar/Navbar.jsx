import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('df_username');
        localStorage.removeItem('df_password');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <span className="navbar__logo-text">CampTalk</span>
                <button className="navbar__menu-button" onClick={toggleMenu}>
                    ☰
                </button>
            </div>
            <div className={`navbar__content ${isMenuOpen ? 'active' : ''}`}>
                <ul className="navbar__links">
                    <li><Link to="/" className="navbar__link">Home</Link></li>
                    <li><Link to="/createpost" className="navbar__link">Ask Question</Link></li>
                    <li><Link to="/my-questions" className="navbar__link">My Questions</Link></li>
                </ul>
                <button className="navbar__logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;