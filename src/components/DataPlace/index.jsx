import ReactMarkdown from 'react-markdown'
import React, { Component } from 'react'
import axios from 'axios'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import './index.css'

export default class DataPlace extends Component {
	constructor(props){
		super(props);
		this.state = {
			markdown: ""
		  }
	  }
	  componentDidMount(){
		axios.get(`http://napoleonxzy.cn:18080/resource/search.md`)
      .then(res => {
        const markdown = res.data;
		console.log(markdown)
        this.setState({ markdown });
      })
	}
	render() {
		return (
			<div className="holder">
 <ReactMarkdown children={this.state.markdown} rehypePlugins={[rehypeRaw,rehypeKatex]} remarkPlugins={[remarkGfm,remarkMath,]} className="data" skipHtml={false}></ReactMarkdown>
			</div>
           	)
	}
}