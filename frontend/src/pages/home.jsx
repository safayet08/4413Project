import ItemList from "../components/itemList";
import { useEffect } from "react";
const Home = ({searchQuery}) => {
    useEffect(()=>{
        console.log(process.env.port)
    },[])

    return (
        <>
            <ItemList searchQuery={searchQuery}/>
        </>
    );
};

export default Home;
