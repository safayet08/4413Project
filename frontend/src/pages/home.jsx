import ItemList from "../components/itemList";
import { useEffect,useState } from "react";
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const [searchParams] = useSearchParams();
    const [filterQuery, setFilterQuery]= useState();
    const [filterCategory, setFilterCategory]= useState();
    useEffect(()=>{
        setFilterCategory(searchParams.get("filter"))
        setFilterQuery(searchParams.get("query"))
    },[searchParams])





    return (
        <>

            <ItemList filterQuery={filterQuery} filterCategory={filterCategory}/>
        </>
    );
};

export default Home;
