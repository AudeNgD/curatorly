import React from "react";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import { MdOutlineMail } from "react-icons/md";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";
import { FaRedditSquare } from "react-icons/fa";
import { FaSquareTumblr } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div id="footer-container">
      <section id="footer-about">
        <p>Created by: Aude Nguyen Duc</p>
        <a href="https://www.linkedin.com/in/audengduc/">Find me on LinkedIn</a>
      </section>
      <section id="footer-credits">
        <Link to="/credits">Credits</Link>
      </section>
      <section id="footer-social-media">
        <ul>
          <li>
            <EmailShareButton
              url="http://localhost:5173/"
              subject="Create a virtual exhibition with curatorly!"
            >
              <MdOutlineMail
                className="footer-sm-icon"
                value="share via email"
              />
              <p style={{ display: "none" }}> Share by email</p>
            </EmailShareButton>
          </li>
          <li>
            <FacebookShareButton hashtag="#artexhibition">
              <FaSquareFacebook className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Facebook</p>
            </FacebookShareButton>
          </li>
          <li>
            <LinkedinShareButton
              source="http://localhost:5173/"
              title="curatorly"
              summary="Create and share your own virtual exhibitions."
            >
              <FaLinkedin className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Facebook</p>
            </LinkedinShareButton>
          </li>
          <li>
            <PinterestShareButton
              media="http://localhost:5173/"
              description="Create and share your own virtual exhibitions."
            >
              <FaPinterestSquare className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Pinterest</p>
            </PinterestShareButton>
          </li>
          <li>
            <RedditShareButton title="curatorly">
              <FaRedditSquare className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Reddit</p>
            </RedditShareButton>
          </li>
          <li>
            <TumblrShareButton
              title="curatorly"
              caption="Create and share your own virtual exhibitions."
              tags={["art", "exhibition"]}
            >
              <FaSquareTumblr className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Tumblr</p>
            </TumblrShareButton>
          </li>
          <li>
            <TwitterShareButton
              title="curatorly"
              hashtags={["art", "exhibition"]}
              url="http://localhost:5173/"
            >
              <FaTwitterSquare className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Twitter</p>
            </TwitterShareButton>
          </li>
          <li>
            <WhatsappShareButton title="curatorly" separator=":: ">
              <FaSquareWhatsapp className="footer-sm-icon" />
              <p style={{ display: "none" }}> Share on Whatsapp</p>
            </WhatsappShareButton>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Footer;
