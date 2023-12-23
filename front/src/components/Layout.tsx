import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SuccessMessage from './SuccessMessage';

const Layout: React.FC = () => {

    return (
        <div className='layout'>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
                <SuccessMessage />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout