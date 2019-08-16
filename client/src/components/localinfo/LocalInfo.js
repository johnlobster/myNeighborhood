import React from 'react';
// import './style.sass';
// import { Link } from 'react-router-dom'
import axios from "axios";
import cheerio from "cheerio";
import API from '../../api/server'


class LocalInfo extends React.Component {

    // newScrape = () => {
    //     let result = [];

    //     axios.get("https://www.kcra.com/local-news/")
    //     .then(function(response){
    //         let $ = cheerio.load(response.data);
    //         $("li a").each(function(i, element){
    //             console.log(element);
    //             // result.push(this);
    //         })
    //     })
    //     .catch( (err) => {
    //         console.log("Error in http access");
    //         console.log(err);
    //     });
    // }    

    // try getting server to scrape to avoid CORS issues
    newScrape = () => {
        axios.get("/api/scrape")
        .then( (response) => {
            console.log("scraped data returned");
            console.log(response.data);
        })
        .catch( (err) => {
            console.log("Error in http access");
            console.log(err);
        })
    }

    render() {

        return (
            <div className="">
                <input type='button' onClick={this.newScrape} value="Scrape" />
            </div>
        );
    }
}
                
export default LocalInfo;