import React from 'react';
// import './style.sass';
// import { Link } from 'react-router-dom'
import axios from "axios";
import cheerio from "cheerio";
import API from '../../api/server'


function LocalInfo() {

let scrape = () => {
    axios.get("https://www.kcra.com/local-news/").then(function(response){
        var $ = cheerio.load(response.data);
        $("li a").each(function(i, element){
            var result = []
            console.log(this);
            // result.push(this);
        })
    })
}    

    // function scrape(){
    //     axios.get("https://www.kcra.com/local-news/").then(function(response){
    //         var $ = cheerio.load(response.data);
    //         $("li a").each(function(i, element){
    //             var result = []
    //             console.log(this);
    //             // result.push(this);
    //         })
    //     })
    // }


scrape();
    return (
        <div className="">
            <input type='button' onClick={API.scrape} value="Scrape" />
        </div>
    );
}
                
export default LocalInfo;