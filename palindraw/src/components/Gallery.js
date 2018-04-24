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
                        <div className="row">
                            <div>
                                <img src={post.firstImage} className="imageStyle" />
                                <p id="text_description" style={{marginTop: '-17px'}}>Drawer's Name</p>
                            </div>
                            <div>
                                <img src={post.secondImage} className="imageStyle" />
                                <p id="text_description" style={{marginTop: '-17px'}}>Drawer's Name</p>
                            </div>
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
                <div className="row" style={{justifyContent: 'space-between'}}>
                    <p className="text_description" style={{fontSize: '20pt', marginTop: '0px'}}>Voting Gallery</p>
                    <div>
                        <button className="button" id="galleryModeButton" onClick={this.draw}>Recent</button>
                        <button className="button" id="galleryModeButton" onClick={this.draw}>My Drawings</button>
                    </div>
                </div>
                <p className="text_description" id="gameSelector">Vote on Recent Games: Select the drawing that you think best completes the prompt!</p>

                {/*
                    If this switches to the mode where the user sees their own game, probably use this text instead of what's above
                    <p className="text_description" id="gameSelector">View your Games: See how your drawings stack up agains your competitors!</p>*/}

                <div id="imageRoundedDiv">
                    {keys.map((key) => {
                        return this.renderPost(this.state.posts[key])
                    })}
                </div>

            </div>
        )
    }
}

export default Gallery
