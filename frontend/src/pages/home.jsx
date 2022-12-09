import ItemList from "../components/itemList";
import { useEffect } from "react";
const Home = () => {
    useEffect(()=>{
        console.log(process.env.port)
    },[])

    return (
        <>
            <ItemList />
        </>
    );
};

export default Home;
