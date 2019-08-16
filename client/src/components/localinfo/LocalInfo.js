import React from 'react';
// import './style.sass';
// import { Link } from 'react-router-dom'
import axios from "axios";
import cheerio from "cheerio";
import API from '../../api/server';
import  "./news.css";


class LocalInfo extends React.Component {
    // try getting server to scrape to avoid CORS issues

    state = {
        news: []
    }

    componentDidMount(){
        axios.get("/api/scrape")
        .then( (response) => {
            console.log("scraped data returned");
            console.log(response.data);
            this.setState({
                news: response.data
            })
        })
        .catch( (err) => {
            console.log("Error in http access");
            console.log(err);
        })

    }

    handleclick = () => {
        console.log("click")
        console.log(this)
    }

    render() {

        return (
            <div>
        
            {this.state.news.map(item => 
    
            // <a className="news" href={item.anchor}>{item.head}</a>
             <p key={item.head} data-value="1" onClick={this.handleclick}>{item.head}</p>
    
            )}
        
            </div>

        );
    }
}
                
export default LocalInfo;