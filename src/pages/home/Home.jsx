import Trending from "../../components/trending/Trending"
import Hero from "../../components/hero/hero"
import Newsletter from "../../components/newsletter/Newsletter"
import Servises from "../../components/servises/Servises"
import Collection from "../../components/collection/Collection"

const Home = () => {
    return (
        <>
            <Hero />
            <Servises/>
            <Trending />
            <Collection/>
            <Newsletter/>
        </>
    )
}
export default Home