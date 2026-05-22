import Navbar from "../components/Navbar/Navbar";

function MainLayout({ children }) {

    return (

        <div>

            <Navbar />

            {children}

        </div>
    );
}

export default MainLayout;