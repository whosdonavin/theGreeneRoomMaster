import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../Responsive";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../Features/Cart";

const ContactPage = styled.section`
  padding: 1rem;
`;
const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;
const Heading = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
`;
const SubHeading = styled.h3`
  width: 50%;
  color: black;
  margin: 0 auto;
  font-size: 1rem;
  ${mobile({ width: "100%" })}
`;
const ContactForm = styled.form`
  gap: 1rem;
  width: 60%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  ${mobile({ width: "100%" })}
  &:focus {
    outline: none;
    border: none;
  }
`;
const Label = styled.label`
  color: black;
  margin-bottom: 0.25rem;
`;
const Input = styled.input`
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
`;
const ValidationMessage = styled.p`
  color: red;
`;
const Textarea = styled.textarea`
  resize: none;
  height: 10rem;
  padding: 0.25rem;
  &:focus {
    outline: none;
  }
`;
const Name = styled.div`
  display: flex;
  flex-direction: column;
`;
const Email = styled.div`
  display: flex;
  flex-direction: column;
`;
const Subject = styled.div`
  display: flex;
  flex-direction: column;
`;
const Message = styled.div`
  display: flex;
  flex-direction: column;
`;
const SendButton = styled.button`
  color: black;
  font-size: 1rem;
  width: fit-content;
  border-radius: 3px;
  background: white;
  padding: 0.5rem 2rem;
  letter-spacing: 0.1rem;
  border: 1px solid black;
  text-transform: uppercase;
  ${mobile({ width: "100%" })}
  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;
const Contact = () => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState("disabled");

  // Input Elements State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [validEmail, setValidEmail] = useState(null);
  const [validMessage, setValidMessage] = useState(null);

  const patterns = {
    name: {
      regex: /^[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/,
      message: "Must Enter First And Last Name",
    },
    email: {
      regex: /^[\w.-]{2,30}@[\w.]{2,30}\.[a-zA-Z]{2,4}$/,
      message: "Must Enter A Valid Email Address",
    },
    message: {
      regex: /^.{20,255}$/,
      message: "Invalid Message",
    },
  };

  // Handle User Input
  function handleName() {
    const nameInput = document.getElementById("name");
    const regex = patterns.name.regex;
    const message = patterns.name.message;
    setName(nameInput.value);
    if (regex.test(name) === true) {
      setNameMessage("");
    } else {
      setNameMessage(message);
    }
  }

  function handleEmail() {
    const regex = patterns.email.regex;
    const message = patterns.email.message;
    const emailInput = document.getElementById("email");

    setEmail(emailInput.value);
    if (regex.test(email) === true) {
      setValidEmail(true);
      setEmailMessage("");
    } else {
      setValidEmail(false);
      setEmailMessage(message);
    }
  }
  function handleSubject() {
    const subjectInput = document.getElementById("subject");
    setSubject(subjectInput.value);
  }

  function handleMessage() {
    const messageInput = document.getElementById("message");
    setMessage(messageInput.value);
    if (message.length < 20) {
      setValidMessage(false);
    } else {
      setValidMessage(true);
    }
  }

  // Form Validation
  function validateForm() {
    if (validEmail !== true || validMessage !== true) {
      setDisabled("disabled");
    } else {
      setDisabled("enabled");
    }
  }

  // Clear Form
  function resetForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  }

  // Send Message
  function sendInquiry(e) {
    e.preventDefault();
    axios
      .post("https://thegreeneroommaster.herokuapp.com/api/contact", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
      .then((response) => {
        let resData = response.data;
        dispatch(updateStatus(resData));
        resetForm();
        setTimeout(() => {
          dispatch(updateStatus({ status: "", message: "" }));
        }, 2500);
      });
  }
  return (
    <ContactPage>
      <HeadingContainer>
        <Heading>Contact</Heading>
        <SubHeading>
          Questions? Special instructions? Enter your information below and we
          will get back to you shortly!
        </SubHeading>
      </HeadingContainer>
      <ContactForm onChange={validateForm}>
        <Name>
          <Label>Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            onChange={handleName}
          ></Input>
          <ValidationMessage>{nameMessage}</ValidationMessage>
        </Name>
        <Email>
          <Label>Email</Label>
          <Input
            id="email"
            placeholder="Name@domain.com"
            onChange={handleEmail}
          ></Input>
          <ValidationMessage>{emailMessage}</ValidationMessage>
        </Email>
        <Subject>
          <Label>Subject</Label>
          <Input
            id="subject"
            placeholder="Inquiry Reason"
            onChange={handleSubject}
          ></Input>
        </Subject>
        <Message>
          <Label>Message</Label>
          <Textarea
            id="message"
            placeholder="Message"
            onChange={handleMessage}
          ></Textarea>
        </Message>
        <SendButton id={disabled} onClick={sendInquiry}>
          Submit
        </SendButton>
      </ContactForm>
    </ContactPage>
  );
};

export default Contact;
