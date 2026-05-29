import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import "./Home.css";
import { Hero } from "../../components/Hero/Hero";

function Home() {

    return (

        <MainLayout>

            <Hero />

        </MainLayout>
    );
}

export default Home;