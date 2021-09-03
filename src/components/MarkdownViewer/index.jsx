
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import './index.css'
import ReactMarkdown from 'react-markdown'
import React, { Component } from 'react'


export default class MarkdownViewer extends Component {
    render() {
        return (
            <div className="holder">
                <ReactMarkdown children={this.props.markdown} rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath,]} className="data" skipHtml={false}>
                </ReactMarkdown>
            </div>
        )
    }
}