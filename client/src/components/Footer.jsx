import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.div``;
const List = styled.div``;
const ListItem = styled.div``;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SHOP</Logo>
        <Desc>
          There are man variations of passages of lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised word which don't look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="e4405f">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55acee">
            <Twitter />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
        </List>
      </Center>
      <Right></Right>
    </Container>
  );
};
