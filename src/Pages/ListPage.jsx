import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/posts";

export default function ListPage(){

    const [status, setStatus]=useState("fetching");
    const [data, setData]=useState(null);

    useEffect(()=>{
        axios
            .get(API_URL)
            .then((response)=>{
                setStatus("success");
                setData(response.data);
                console.log(response.data);
            })
            .catch((err)=>{
                setStatus("failed");
            });
    }, []);

    if (status=="fetching") return <h1>Loading</h1>


    return (
        <>
            <button className="newchat">newchat</button>
            {data.map((element, index)=>{
                return <div className="post-container" key={index}>
                    <Link to={"/list/"+index}>
                        <h1>{element.title}</h1>
                    </Link>
                    <h3>{element.published}</h3>
                    <h3>{element.category}</h3>
                </div>
            })}
        </>

    );
}