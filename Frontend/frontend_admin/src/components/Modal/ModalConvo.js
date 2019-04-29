import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";
import axios from "axios";

import { db } from "../../firebase";
import useCollection from "../../Hooks/useCollection";

function useAutoScroll(ref) {
  useEffect(() => {
    const node = ref.current;
    node.scrollTop = node.scrollHeight;
  });
}

const ModalConvo = styled.form`
  width: 100%;
  height: 89%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ConvoContent = styled.div`
  width: 100%;
  height: 88%;
  // border: 1px solid black;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const ContentOthers = styled.div`
  margin-left: 4rem;
  text-align: left;
  & > div > h1 {
    display: inline;
    font-size: 1.6rem;
    font-weight: bold;
    color: #334e68;
    margin-right: 1rem;
  }

  & > div > span {
    font-size: 1.2rem;
    font-weight: normal;
    color: #aac0d5;
  }

  & > p {
    margin-top: 1.6rem;
    display: inline-block;
    background-color: #f5f7fa;
    font-size: 1.6rem;
    max-width: 60%;
    padding: 1.4rem;
    border-radius: 0 12px 12px 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    line-height: 1.4;
    margin-bottom: 2rem;
  }
`;

const ContentYou = styled.div`
  margin-right: 4rem;
  text-align: right;
  & > div > h1 {
    display: inline;
    font-size: 1.6rem;
    font-weight: bold;
    color: #334e68;
    margin-right: 1rem;
  }

  & > div > span {
    font-size: 1.2rem;
    font-weight: normal;
    color: #aac0d5;
  }

  & > p {
    margin-top: 1.6rem;
    display: inline-block;
    background-color: #f5f7fa;
    font-size: 1.6rem;
    max-width: 60%;
    padding: 1.4rem;
    border-radius: 12px 12px 0 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    line-height: 1.4;
    margin-bottom: 2rem;
  }
`;

const ConvoChatbox = styled.div`
  width: 100%;
  height: 56%;
  border: 0.5px solid #dde4ee;
  border-radius: 8px;
  font-size: 1.4rem;
  resize: none;
  line-height: 1.6;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  // &:has(> textarea:focus) {
  //   border: 2px solid #7793bb;
  // }
`;

const ChatboxText = styled.textarea`
  width: 100%;
  height: 84%;
  padding: 2rem 2rem 1.2rem 2rem;
  border: none;
  font-size: 1.4rem;
  resize: none;
  line-height: 1.6;
  &:required {
    box-shadow: none;
  }
  &:invalid {
    box-shadow: none;
  }
`;

const ChatboxImage = styled.div`
  width: 100%;
  margin: 0 2.1rem;
  & > img {
    margin-right: 1rem;
    width: 30px;
    height: 30px;
    position: relative;
  }
  // & > img:hover {
  // }
`;

const ChatboxButtons = styled.div`
  height: 16%;
`;

const Dropbox = styled.div`
  width: 87%;
  height: 25%;
  position: absolute;
  border-radius: 8px;
  // border: 1px solid blue;
  bottom: 15%;
  left: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

const DropboxText = styled.div`
  display: none;
  // border: 1px solid black;
  text-align: center;
  font-size: 3rem;
  width: 80%;
  height: 80%;
  color: #aac0d5;
  display: none;
  position: relative;
  top: 26%;
`;

const ConvoButton = styled.button`
  font-size: 1.4rem;
  border: none;
  display: inline-block;
  position: absolute;
  background: none;
  color: #aac0d5;
  cursor: pointer;
`;

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith("image/")) {
      continue;
    }

    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    document.getElementById("trial").appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}

const ModalConvoComp = ({ user, ticket }) => {
  const [images, setImages] = useState([]);

  const scrollerRef = useRef();
  useAutoScroll(scrollerRef);

  const handleModalConvoSubmit = e => {
    e.preventDefault();
    const submitTime = new Date();
    if (ticket.status === "Await Your Reply") {
      const responseTime = new Date();
      db.doc(`tickets/${ticket.id}`).set({
        ...ticket,
        status: "Admin Replied",
        lastUpdatedTime: responseTime,
        firstResponseTime: responseTime
      });
    }
    db.collection(`tickets/${ticket.id}/conversations`).add({
      content: e.target.elements[0].value,
      submitTime: submitTime,
      user: {
        name: user.name,
        id: user.id,
        position: "admin"
      }
    });
    db.collection("updates").add({
      type: "admin-update",
      userID: user.id,
      requester: user.name,
      subject: ticket.subject,
      group: ticket.group,
      content: e.target.elements[0].value,
      updatedTime: submitTime
    });
    axios.post("https://calm-falls-75658.herokuapp.com/api/push-update", {
      data: {
        title: "Ticket Reply by Admin",
        requester: user.name,
        type: "admin-update",
        group: ticket.group
      },
      topic: "admin-update"
    });
    e.target.elements[0].value = "";
  };

  const conversations = useCollection(
    `tickets/${ticket.id}/conversations`,
    "submitTime"
  );

  const renderContent = conversations => {
    if (conversations.length > 0) {
      return conversations.map(convo => {
        const notYou = convo.user.id !== user.id;

        return notYou ? (
          <ContentOthers key={convo.id}>
            <div>
              <h1>
                {convo.user.position === "admin" ? "Admin" : "Client"}{" "}
                {convo.user.name}
              </h1>
              <span style={{ textTransform: "capitalize" }}>
                {" "}
                {formatRelative(convo.submitTime.toDate(), new Date())}
              </span>
            </div>
            <p>{convo.content}</p>
          </ContentOthers>
        ) : (
          <ContentYou key={convo.id}>
            <div>
              <h1>You</h1>
              <span style={{ textTransform: "capitalize" }}>
                {" "}
                {formatRelative(convo.submitTime.toDate(), new Date())}
              </span>
            </div>
            <p>{convo.content}</p>
          </ContentYou>
        );
      });
    }
  };

  if (document.querySelector("#fileElem")) {
    document.querySelector("#fileElem").addEventListener("change", e => {
      if (e.target.files) {
        const files = e.target.files;
        console.log(files);
        handleFiles(files);
      }
    });
    document.querySelector(".upload-button").addEventListener("click", e => {
      document.querySelector("#fileElem").click();
    });
    let dropbox, chatbox;

    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }
    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
      document.getElementById("dropbox").style.zIndex = "1";
      document.getElementById("dropbox-text").style.zIndex = "1";
      document.getElementById("dropbox").style.backgroundColor = "#fee29a";
      document.getElementById("dropbox-text").style.display = "block";
    }
    function dragexit(e) {
      e.stopPropagation();
      e.preventDefault();
      document.getElementById("dropbox").style.zIndex = "-1";
      document.getElementById("dropbox-text").style.zIndex = "-1";
      document.getElementById("dropbox").style.backgroundColor = "white";
      document.getElementById("dropbox-text").style.display = "none";
    }
    function drop(e) {
      e.stopPropagation();
      e.preventDefault();
      document.getElementById("dropbox").style.zIndex = "-1";
      document.getElementById("dropbox-text").style.zIndex = "-1";
      document.getElementById("dropbox").style.backgroundColor = "white";
      document.getElementById("dropbox-text").style.display = "none";
      const dt = e.dataTransfer;
      const files = dt.files;
      console.log(files);
      handleFiles(files);
    }

    chatbox = document.getElementById("chatbox");
    dropbox = document.getElementById("dropbox");
    // chatbox.addEventListener("dragenter", dragenter, false);
    chatbox.addEventListener("dragover", dragover, false);
    chatbox.addEventListener("dragexit", dragexit, false);
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("dragexit", dragexit, false);
    dropbox.addEventListener("drop", drop, false);
  }

  return (
    <ModalConvo onSubmit={handleModalConvoSubmit}>
      <ConvoContent ref={scrollerRef}>
        {renderContent(conversations)}
      </ConvoContent>
      <ConvoChatbox id="chatbox">
        <ChatboxText required />
        <ChatboxImage id="trial">
          {/* {images.map(image => {
            var openFile = function(file) {
              var input = image.target;
          
              var reader = new FileReader();
              reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('output');
                output.src = dataURL;
              };
              reader.readAsDataURL(input.files[0]);
            };
          })} */}
        </ChatboxImage>
        <ChatboxButtons>
          <ConvoButton
            className="upload-button"
            onClick={e => {
              e.preventDefault();
            }}
            style={{ bottom: "11.4%", left: "6.4%" }}
          >
            Upload Images (Drag n' Drop works too!)
          </ConvoButton>
          <input
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            style={{ display: "none" }}
          />
          <ConvoButton style={{ bottom: "11.4%", right: "6.4%" }}>
            Send
          </ConvoButton>
        </ChatboxButtons>
      </ConvoChatbox>
      {/* <div id="trial" /> */}
      <Dropbox id="dropbox">
        <DropboxText id="dropbox-text">Drop Your Images Here</DropboxText>
      </Dropbox>
    </ModalConvo>
  );
};

export default ModalConvoComp;
