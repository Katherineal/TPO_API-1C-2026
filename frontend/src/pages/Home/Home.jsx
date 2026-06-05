import MainLayout from "../../layouts/MainLayout";
import "./Home.css";
import { BentoHero } from "../../components/Home/BentoHero";
import { TrustBar } from "../../components/Home/TrustBar";
import { CategoryCarousel } from "../../components/Home/CategoryCarousel";

function Home() {
    return (
        <MainLayout>
            <BentoHero />
            <TrustBar />
            <CategoryCarousel />
        </MainLayout>
    );
}

export default Home;