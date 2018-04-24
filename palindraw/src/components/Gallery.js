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
            <div className="post">

                <center>
                    <p className="subtitle" id="galleryPostTitle">Prompt Title</p>
                    <div className="row" id="galleryPostVotes">
                        <p className="text_description" id="galleryVotes" style={{marginLeft: '30px'}}>6 👍🏼</p>
                        <div>
                            <img src={post.firstImage} className="imageStyle" />
                            <img src={post.secondImage} className="imageStyle" />
                        </div>
                        <p className="text_description" id="galleryVotes" style={{marginRight: '30px'}}>👍🏼 3</p>
                    </div>
                </center>



            </div>
        )
    }

    // Mandatory render method
    render() {

        const keys = Object.keys(this.state.posts)

        return (
            <div className="contentContainer" id="galleryContainer">
                <p className="title_text">Voting Gallery</p>
                {keys.map((key) => {
                    return this.renderPost(this.state.posts[key])
                })}
            </div>
        )
    }
}

export default Gallery
