import logo from "../images/logo.jpeg";

const Nav = () => {
    return (
        <>
        {/* <img src={logo} alt="logo" />
        <div>About Us</div> */}
        <nav className="flex sm:justify-around space-x-4 bg-light-pink font-worksans">
            <a href='/' className="rounded-lg px-3 py-2 font-medium hover:bg-green hover:text-yellow text-green">Home</a>
            <a href='/aboutus' className="rounded-lg px-3 py-2 font-medium hover:bg-green hover:text-yellow text-green">About Us</a>
        </nav>
        </>
    )
}

export default Nav