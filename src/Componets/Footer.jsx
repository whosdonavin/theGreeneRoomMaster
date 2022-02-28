import styled from "styled-components";
import { mobile } from "../Responsive";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";

const FooterContent = styled.footer`
  color: grey;
  padding: 1rem;
  text-align: center;
`;
const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MediaLink = styled.a`
  color: grey;
  &:hover {
    color: #1d1d1d;
  }
`;
const Twitter = styled(FaTwitter)`
  margin: 0 10px;
`;
const Instagram = styled(FaInstagram)`
  margin: 0 10px;
`;
const Facebook = styled(FaFacebookF)`
  margin: 0 10px;
`;
const FooterTitle = styled.p`
  color: black;
  font-size: 1.5rem;
  padding-top: 0.5rem;
`;
const FooterHeading = styled.p`
  padding-top: 0.5rem;
  ${mobile({ "font-size": ".65rem" })}
`;
const Copyright = styled.p`
  color: black;
  padding-top: 0.5rem;
  ${mobile({ "font-size": ".75rem" })}
`;

const Footer = () => {
  return (
    <FooterContent>
      <SocialMedia>
        <MediaLink
          href="https://twitter.com/greeneroomokc"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </MediaLink>
        <MediaLink
          href="https://www.instagram.com/thegreeneroomokc/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </MediaLink>
        <MediaLink
          href="https://www.facebook.com/thegreeneroomokc"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook />
        </MediaLink>
      </SocialMedia>
      <FooterTitle>The Greene Room</FooterTitle>
      <FooterHeading>Oklahoma City’s Premiere Event Caterer</FooterHeading>
      <Copyright>&copy; 2022 The Greene Room | All rights Reserved</Copyright>
    </FooterContent>
  );
};

export default Footer;
