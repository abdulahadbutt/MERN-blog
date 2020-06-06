import React, {Component} from 'react';
import axios from 'axios';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import '../css/article.css';
// const ReactMarkdown = require('react-markdown');

class ArticlePage extends Component{

    state = {
        body: '',
        desc: '',
        createdAt: '',
        tags: [],
        title: ''
    }


    componentDidMount() {
        const url = window.location.pathname;
        axios.get(url)
            .then(res => {
                const {body, createdAt, desc, tags, title} = res.data;
                this.setState({
                    body: body,
                    desc: desc,
                    tags: tags,
                    title: title,
                    createdAt: createdAt
                });
            })
            .catch(err => console.error(err));
    }


    render() {
        const _date = new Date(this.state.createdAt);
        const day = _date.getDate();
        const month = _date.getMonth();
        const year = _date.getFullYear() % 100;

        return(
            <div className="article">
                <h1 className="title">{this.state.title}</h1>
                <h2 className="date">{day}/{month}/{year}</h2>
                <div className="tags-container">
                    {
                        this.state.tags.map((tag, i) => {
                            return <Tag key={i} tag_name={tag} tagNum={i}/>
                        })
                    }
                </div>
                <ReactMarkdown source={this.state.desc}  className='article-desc'/>
                {/* <hr className='divider'/> */}
                <ReactMarkdown source={this.state.body}  className='article-body'/>
                

                
            </div>
        )
    }
}


export default ArticlePage;
