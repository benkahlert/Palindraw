import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import "../css/Gallery.css"

class Gallery extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            posts: { },
            recent: true
        }
    }

    // Sets up syncing to posts
    componentWillMount = () => {
        rebase.syncState(`posts`, {
            context: this,
            state: 'posts'
        })
    }

    renderPost = (post, key) => {

        const tempStyle = {width: "250px", height: "250px", borderRadius: "50%"}
        const firstLikesKeys = Object.keys(post.firstLikes)
        const secondLikesKeys = Object.keys(post.secondLikes)

        return (
            <div className="post" key={key}>

                <center>
                    <p className="subtitle" id="galleryPostTitle">{post.word}</p>
                    <div className="row" id="galleryPostVotes">
                        <p className="text_description" id="galleryVotes" style={{marginLeft: '30px'}}>{firstLikesKeys.length - 1} 👍🏼</p>
                        <div className="row">
                            <div>
                                <img onClick={() => {
                                    const newState = { ...this.state }
                                    newState.posts[key].firstLikes[this.props.getAppState().user.uid] = true
                                    if (newState.posts[key].secondLikes[this.props.getAppState().user.uid] === true) {
                                        delete newState.posts[key].secondLikes[this.props.getAppState().user.uid]
                                        rebase.remove(`/posts/${key}/secondLikes/${this.props.getAppState().user.uid}`)
                                    }
                                    const newFirstKeys = Object.keys(newState.posts[key].firstLikes)
                                    const newSecondKeys = Object.keys(newState.posts[key].secondLikes)
                                    if (newFirstKeys.length > newSecondKeys.length) {
                                        rebase.post(`/users/${post.firstUid}/numWins/${key}`, {
                                            data: true
                                        })
                                        rebase.post(`/users/${post.secondUid}/numLosses/${key}`, {
                                            data: true
                                        })
                                        rebase.remove(`/users/${post.secondUid}/numWins/${key}`)
                                    } else if (newFirstKeys.length === newSecondKeys.length) {
                                        rebase.remove(`/users/${post.secondUid}/numWins/${key}`)
                                        rebase.remove(`/users/${post.firstUid}/numLosses/${key}`)
                                    }
                                    this.setState(newState)
                                }} src={post.firstImage} className="imageStyle" />
                                <p id="text_description" style={{marginTop: '-17px'}}>{post.firstEmail}</p>
                            </div>
                            <div>
                                <img onClick={() => {
                                    const newState = { ...this.state }
                                    newState.posts[key].secondLikes[this.props.getAppState().user.uid] = true
                                    if (newState.posts[key].firstLikes[this.props.getAppState().user.uid] === true) {
                                        delete newState.posts[key].firstLikes[this.props.getAppState().user.uid]
                                        rebase.remove(`/posts/${key}/firstLikes/${this.props.getAppState().user.uid}`)
                                    }
                                    const newFirstKeys = Object.keys(newState.posts[key].firstLikes)
                                    const newSecondKeys = Object.keys(newState.posts[key].secondLikes)
                                    if (newSecondKeys.length > newFirstKeys.length) {
                                        rebase.post(`/users/${post.secondUid}/numWins/${key}`, {
                                            data: true
                                        })
                                        rebase.post(`/users/${post.firstUid}/numLosses/${key}`, {
                                            data: true
                                        })
                                        rebase.remove(`/users/${post.firstUid}/numWins/${key}`)
                                    } else if (newFirstKeys.length === newSecondKeys.length) {
                                        rebase.remove(`/users/${post.firstUid}/numWins/${key}`)
                                        rebase.remove(`/users/${post.secondUid}/numLosses/${key}`)
                                    }
                                    this.setState(newState)
                                }} src={post.secondImage} className="imageStyle" />
                                <p id="text_description" style={{marginTop: '-17px'}}>{post.secondEmail}</p>
                            </div>
                        </div>
                        <p className="text_description" id="galleryVotes" style={{marginRight: '30px'}}>👍🏼 {secondLikesKeys.length - 1}</p>
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
                        <button className="button" id="galleryModeButton" onClick={() => {
                            this.setState({recent: true})
                        }}>Recent</button>
                        <button className="button" id="galleryModeButton" onClick={() => {
                            this.setState({recent: false})
                        }}>My Drawings</button>
                    </div>
                </div>
                <p className="text_description" id="gameSelector">Vote on Recent Games: Select the drawing that you think best completes the prompt!</p>

                {/*
                    If this switches to the mode where the user sees their own game, probably use this text instead of what's above
                    <p className="text_description" id="gameSelector">View your Games: See how your drawings stack up agains your competitors!</p>*/}

                <div id="imageRoundedDiv">
                    {keys.map((key) => {
                        return this.renderPost(this.state.posts[key], key)
                    })}
                </div>

            </div>
        )
    }
}

export default Gallery
