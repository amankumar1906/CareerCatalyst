import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { Timestamp } from "firebase/firestore";

import { postArticleAPI } from "../actions";
const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const reset = (event) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(event);
  };

  function switchAssetArea(area) {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  }

  function postArticle(event) {
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      description: editorText,
      user: props.user,
      timestamp: Timestamp.now(),
    };

    props.postArticle(payload);
    reset(event);
  }

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image! File is of type ${typeof image}`);
      return;
    }

    setShareImage(image);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2> Create a post </h2>
              <button onClick={(event) => reset(event)}>X</button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  {props.user.displayName ? props.user.displayName : "Name"}
                </span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(event) => setEditorText(event.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="imageFile"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <p>
                      <label htmlFor="imageFile">
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        name="video"
                        id="videoFile"
                        value={videoLink}
                        placeholder="Enter the video link"
                        onChange={(event) => setVideoLink(event.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAsset>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img
                    src="/images/video-share.svg"
                    alt=""
                    style={{ width: "20px", height: "20px" }}
                  />
                </AssetButton>
              </AttachAsset>
              <ShareComment>
                <AssetButton>
                  <span>Comment</span>
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: inital;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width; auto;
    color: rgba(0,0,0,0.15)
    pointer-events: none;
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 24px 10px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  margin-right: 8px;
  border-radius: 50%;
  border: none;
  outline: none;
  justify-content: center;
  background: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const AttachAsset = styled.div`
  display: flex;
  align-items: center;
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  ${AssetButton} {
    border-radius: 50px;
    padding: 5px 10px;
    span {
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
      padding: 0 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  padding: 0 16px;
  border-radius: 20px;
  background: ${(props) => (props.disabled ? "#b8b8b8" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
  font-size: 16px;
  letter-spacing: 1.1px;
  border: none;
  outline: none;
  &:hover {
    background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
