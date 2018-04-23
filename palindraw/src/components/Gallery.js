import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import "../css/Gallery.css"

class Gallery extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            posts: { }
        }
    }

    // Sets up syncing to posts
    componentWillMount = () => {
        rebase.syncState(`posts`, {
            context: this,
            state: 'posts'
        })
    }

    renderPost = (post) => {

        const tempStyle = {width: "250px", height: "250px", borderRadius: "50%"}

        return (
            <div>
                <img src={post.firstImage} style={tempStyle} />
                <img src={post.secondImage} style={tempStyle} />
            </div>
        )
    }

    // Mandatory render method
    render() {

        const keys = Object.keys(this.state.posts)

        return (
            <div>
                {keys.map((key) => {
                    return this.renderPost(this.state.posts[key])
                })}
            </div>
        )
    }
}

export default Gallery