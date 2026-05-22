import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (

        <MainLayout>

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Bienvenido a TechStore
                    </h1>

                    <p>
                        Tecnología, notebooks, gaming y accesorios al mejor precio.
                    </p>

                    <Link to="/productos">

                        <button>
                            Ver Productos
                        </button>

                    </Link>

                </div>

            </section>

        </MainLayout>
    );
}

export default Home;