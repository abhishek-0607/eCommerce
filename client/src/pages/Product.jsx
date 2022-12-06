import React from "react";
import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Newsletter } from "../components/Newsletter";
const Container = styled.div``;
const Wrapper = styled.div``;
const ImgContainer = styled.div``;
const Image = styled.div``;
const InfoContainer = styled.div``;
const Title = styled.div``;
const Desc = styled.div``;
const Price = styled.div``;
export const Product = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image></Image>
        </ImgContainer>
        <InfoContainer>
          <Title></Title>
          <Desc></Desc>
          <Price></Price>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};
