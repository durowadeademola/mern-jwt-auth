import './styles.module.css';

const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem('item');
        window.location.reload();
    }
    return (
        <div className='main_container'>
            <nav className='navbar'>
                <h1>facebook</h1>
                <button className='white_btn' onClick={handleLogout}>
                    Logout 
                </button>
            </nav>
        </div>
    )
};

export default Main;