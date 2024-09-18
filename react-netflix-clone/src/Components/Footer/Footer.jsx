import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer_container">
      <div className="footer">
        <div className="footer_icons">
          <a href="https://www.facebook.com/Netflix"> <FacebookIcon /> </a>
          <a href="https://www.instagram.com/netflix/"> <InstagramIcon /> </a>
          <a href="https://twitter.com/netflix"> <TwitterIcon /> </a>
          <a href="https://www.youtube.com/netflix"> <YouTubeIcon /> </a>
        </div>
        <div className="footer_ul">
          <ul>
            <li> <a href="https://www.netflix.com/browse/audio-description">Audio Description</a> </li>
            <li> <a href="https://ir.netflix.net/ir-overview/profile/default.aspx">Investor Relations</a> </li>
            <li> <a href="https://help.netflix.com/legal/privacy">privacy</a> </li>
            <li> <a href="https://help.netflix.com/en/contactus">contcat us</a> </li>
          </ul>
          <ul>
            <li> <a href="https://help.netflix.com/en">Help Center</a> </li>
            <li> <a href="https://jobs.netflix.com/">Jobs</a> </li>
            <li> <a href="https://help.netflix.com/legal/notices">Legal Notices</a> </li>
            <li>
              <a href="https://help.netflix.com/legal/dnsspi">
                DO Not Sell or Share My Personal <br/> Information
              </a>
            </li>
          </ul>
          <ul className='gift'>
            <li> <a href="https://www.netflix.com/redeem">Gift Cards</a> </li>
            <li> <a href="https://www.netflix.shop/">Netflix shop</a> </li>
            <li> <a href="#">Cookie Preferences</a> </li>
            <li> <a href="https://help.netflix.com/legal/dnsspi#DAA">Ad Choices</a> </li>
          </ul>
          <ul>
            <li> <a href="https://media.netflix.com/en/">Media Center</a> </li>
            <li> <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a> </li>
            <li> <a href="https://help.netflix.com/en/node/134094">Corporate Information</a> </li>
          </ul>
        </div>
        <button className="serviceCode"> <a className="anchor" href="#">Service Code</a> </button>
        <p className="copyright">© 1997-2024 Netflix, Inc.</p>
      </div>
      <div></div>
    </div>
  );
}