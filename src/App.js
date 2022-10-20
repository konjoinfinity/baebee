import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

let txreceipt = "";

export const StyledButton = styled.button`
  padding: 35px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 20px;
  font-size: 28px;
  font-weight: bold;
  color: var(--primary);
  width: 400px;
  cursor: pointer;
  box-shadow: 0px 10px 0px -2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  margin-bottom: 1%;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  @media (max-width: 1100px) {
    width: 300px;
    font-size: 24px;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--secondary);
  padding: 25px;
  font-weight: bold;
  font-size: 25px;
  color: var(--primary);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  boxShadow: 0px 5px 11px 2px rgba(0,0,0,0.5),
  -webkit-box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.5);
  -moz-box-shadow: 0px 5px 11px 2px rgba(0,0,0,0.5);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const Contain = styled.div`
  flex: 2;
  justify-content: center;
  align-items: center;
  padding: 5%;
`;

export const ResponsiveLow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

export const TopText = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  border-radius: 20%;
  width: 450px;
  @media (max-width: 767px) {
    width: 300px;
    margin: 10%;
  }
`;

export const StyledBanner = styled.img`
  width: 40em;
  @media (max-width: 1100px) {
    width: 22em;
  }
`;

export const StyledIcon = styled.img`
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
  background-color: #F9CFCB;
  border-radius: 20%;
  width: 50px;
  padding: 10px;
  margin: 5px;
`;

export const StyledSpec = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.3);
  background-color: #FCB1A3;
  border-radius: 20%;
  width: 4em;
  padding: 10px;
  margin: 5px;
`;

export const StyledHead = styled.img`
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
  background-color: var(--accent);
  border-radius: 20%;
  width: 100px;
  padding: 15px;
  margin: 5px;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 3%;
  background-color: #FCB1A3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;



function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNFT, setClaimingNFT] = useState(false);
  const [feedback, setFeedback] = useState(`Click to mint your Toxic Baebee NFT`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNFT(true);
          blockchain.smartContract.methods
          .mint(mintAmount)
          .send({
            gasLimit: String(totalGasLimit),
            to: CONFIG.CONTRACT_ADDRESS,
            from: blockchain.account,
            value: totalCostWei,
          })
          .once("error", (err) => {
            console.log(err);
            setFeedback("Sorry, something went wrong please try again later.");
            setClaimingNFT(false);
          })
          .then((receipt) => {
            console.log(receipt);
            txreceipt = receipt
            setFeedback(
              `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it ==> `
            );
            setClaimingNFT(false);
            dispatch(fetchData(blockchain.account));
            console.log(blockchain)
          });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ background: "linear-gradient(#FFAB9C, #FEF7E9)" }}>
          <s.Container flex={1} style={{display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 10,
                boxShadow: "0px 5px 11px 2px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#F9CFCB",}}>
              <a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
              <s.Container>
              <StyledHead alt={"linkedin"} src={"/config/images/reauty-new-logo-web3-04-1@2x.png"} />
              </s.Container>
              </a>
              </s.Container>
              <s.SpacerLarge />
        <s.TextTitle style={{fontSize: "2.5em"}}>
              TOXIC BAEBEE NFTS
            </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "bold",
                color: "#01CAFF"
              }}
            >
              ________
            </s.TextTitle>
            <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center", justifySelf: "center"}}>

        <Card sx={{ maxWidth: 500, maxHeight: "50%", padding: "2%", backgroundColor: "#FEF7E9" }}>
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
        The Beauty Industry Lacks Transparency And Regulation. Beauty Consumers Are Frustrated With Misleading Information And Exaggerated Marketing Claims.   
        </Typography>
        <s.SpacerXSmall />
        <Typography gutterBottom variant="p" component="div">
        This Deceptive Industry Which Idolizes The "Skinny And Beauty Culture," Leads Many Customers To Obtain Unnecessary Plastic Surgery, Unhealthy Eating Habits, And Unknowingly Use Beauty Products With Toxic Ingredients.
        </Typography>
        <s.SpacerXSmall />
        <Typography gutterBottom variant="p" component="div">
        The "Toxic Baebee" NFT Series Was Designed To Generate Public Awareness By Illustrating The "Toxic Side Of Beauty".  
        </Typography>
      </CardContent>
      <CardActions>
      <s.Container flex={1} style={{ display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"}}>
      {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.SpacerXSmall />
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      Connect Your Wallet
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                        fontSize: "25px"
                      }}
                    >
                      {feedback} 
                      {txreceipt !== "" ?
                      <a href={`https://opensea.io/assets/matic/0x68e5167252b534ad3a50d559ab61ef6b84e1ee09/${txreceipt.events.Transfer.returnValues.tokenId}`} target="_blank">Opensea</a>
                      : ""}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNFT ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--primary-text)",
                          fontSize: "25px"
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNFT ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNFT ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNFT ? "MINTING..." : "MINT - 25 MATIC"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
           </s.Container>
      </CardActions>
    </Card>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"example"}
              src={"/config/images/example.gif"}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerMedium />
        <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: "3em",
                fontWeight: "bold",
                color: "var(--primary-text)"
              }}
            >
              SPECIFICATIONS
            </s.TextTitle>
            <s.SpacerMedium />
            <s.SpacerMedium />
        <ResponsiveLow flex={1}>
        <s.Container flex={1} style={{padding: "1%", display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"}}>
            <StyledBanner
              alt={"example"}
              src={"/config/images/toxbbs.png"}
            />
          </s.Container>
          <s.Container
            flex={2}
            style={{
              padding: 20,
              borderRadius: 24,
            }}>

<s.Container flex={1} style={{padding: "1%", display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"}}>
<Card sx={{ maxWidth: 375, margin: "2%", padding: "4%", backgroundColor: "#FEF7E9" }}>
      <CardMedia> 
      <StyledSpec alt={"linkedin"} src={"/config/images/profile@2x.svg"} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        The Characters
        </Typography>
        <Typography variant="body2" color="text.secondary">
Each Unique Baebee Is Created By A Program That Generates Over 170 Possible Traits These Include But Are Not Limited To Expression, Headwear And Clothing. Tha Majority Of Baebees Are 2d And 10 Are 3d.
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ maxWidth: 375, margin: "2%", padding: "4.5%", backgroundColor: "#FEF7E9" }}>
      <CardMedia> 
      <StyledSpec alt={"linkedin"} src={"/config/images/polygon.png"} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        ERC-721
        </Typography>
        <Typography variant="body2" color="text.secondary">
        The Baebees NFT Contract That Governs Ownership Is A Standard ERC-721 Which Is Compatible With Any Service Or Exchange, And Purchasing Baebee Costs 25 MATIC - POLYGON.
 </Typography>
      </CardContent>
    </Card>

    <Card sx={{ maxWidth: 375, margin: "2%", padding: "4%", backgroundColor: "#FEF7E9" }}>
      <CardMedia> 
      <StyledSpec alt={"linkedin"} src={"/config/images/utility.png"} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Specialty
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Baebees NFTs are Convertable To Reautycoin (ERC 2.0 Token). We Allow Our NFT Owner To Convert Their NFT To Our Reautycoin, Please Check The Reautycoin Page To Learn More.
                </Typography>
      </CardContent>
    </Card>
    </s.Container>
            <s.SpacerMedium />
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveLow>
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: "3em",
                fontWeight: "bold",
                color: "var(--primary-text)"
              }}
            >
              RECENT MINTS
            </s.TextTitle>
            <s.SpacerLarge />
            <s.SpacerLarge />
      
            <s.Container flex={1} style={{padding: "1%", display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"}}>
            <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/_v-_d-QcL3fB2j96ZxUopcsHwr5WljtdzqIBRp42HRqlq-66d0Fp71aUfKPvhrzX6AoCRP6rc_rIEwqWsoZeRr-uqrWRm6zqP7PdonE?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #1
        </Typography>
      </CardContent>
      <CardActions>
      <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/8PihCqhVPNZgyaspteya0tg5if_UzfiFSmjI7JwE9Jru9Ui6bdKmE2baYPUWAC2Xy6TlDwkOe1fkTLMCMRQerLPUBATiCVbxUwvpYQ?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #2
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/_v-_d-QcL3fB2j96ZxUopcsHwr5WljtdzqIBRp42HRqlq-66d0Fp71aUfKPvhrzX6AoCRP6rc_rIEwqWsoZeRr-uqrWRm6zqP7PdonE?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #3
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/9aC-6UflX7UFEg9unOIerPstObzSDmoppXg2V6phHsi78KkrGDdioZ_im2-7SD9rqrXrGi5PpfItyRvHUKN7VTS6VJIkMhMOSfPLBhE?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #4
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/kZ6lOfyMfWLeV6XF4DaQ5IDot0b1i6brMq6SyoMUmiSWt3a1eNLhdIq8tl1FjF3tvzgOxVbhRT998RvvFijZyUFLAMPyrxQxxHbcSQ?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #5
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/tWeVD95U92BTHewJVhuJKEKGlPqhPnYreD4sPgRSyqtvLe8Al4WqNQxVVnF-LK3i24DrGg5fhBDsYXlUtV_Oww6t3kVz25bfFuvB?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #6
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/kelXuNv6UZxFH89glmV2VfV4B0lKHkf-hugpXKGVIWjB1SCfTGmQQRwbPo76jNg7HTmLah0VzsYNUFEdshdzjKDZRlxLiQH_ewSXLQ?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #7
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/lQbYb1NyP7LtpkSSQLVln5PKaiAOoNhzfflnu-7cPUMC5hIGSrVgImGkc4Ca5DzZe3lFc4KfeWVUyAkAu5urZvaKN5JILDOYGTAeNw?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #8
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/05vPImS1AbUoJlERfli5dZP1xNPJM8qf_LZdZbLKh1641WanVeTefRFH7qGh0N6Yc5RokFT0LrgU7fy0znVcjlqDupJuG_GSOAgL8gY?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #9
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 360, margin: "1%" }}>
      <CardMedia
        component="img"
        height="260"
        image="https://i.seadn.io/gae/Og52e2NyyPZKSzpeJMAe7sBIDAoVivIckP_bmEpb-velWeczKl0AethDYIsKEbkwu_6KQG38yWsYgqziwYDbojQcpTYosWqq6dDJWtg?auto=format&w=1000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Toxic Baebee #10
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="https://opensea.io/collection/toxic-baebee-nft-series">
        <Button size="small">View Collection</Button>
        </Link>
      </CardActions>
    </Card>

    </s.Container>
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
      <Footer flex={1}>
<s.TextTitle style={{ textAlign: "left", color: "var(--primary)", fontSize: "20px", marginRight: "18%"}}>© Copyright ReautyDAO 2022</s.TextTitle>

<a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)", marginRight: "15px"}}> Document</s.TextDescription>
</a>
<a href="https://www.blingyte.com/privacy-policy" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)" , marginRight: "15px"}}> Terms Of Service</s.TextDescription>
</a>
<a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)"}}> Traits & Rarities</s.TextDescription>
</a>
<a href="https://www.linkedin.com/company/blingy/" style={{color: "var(--primary)", marginLeft: "18%"}}>
<StyledIcon alt={"linkedin"} src={"/config/images/linkedin.png"} />
</a>
<a href="https://twitter.com/ReautyDao" style={{color: "var(--primary)"}}>
<StyledIcon alt={"linkedin"} src={"/config/images/twitter.png"} />
</a>
<a href="https://www.instagram.com/reautyapp/" style={{color: "var(--primary)"}}>
<StyledIcon alt={"linkedin"} src={"/config/images/igig.png"} />
</a>
<a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
<StyledIcon alt={"linkedin"} src={"/config/images/discord.png"} />
</a>
          </Footer>
      </s.Container>
   </s.Screen>
  );
}

export default App;