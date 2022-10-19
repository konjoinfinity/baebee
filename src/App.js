import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="https://i.seadn.io/gae/_v-_d-QcL3fB2j96ZxUopcsHwr5WljtdzqIBRp42HRqlq-66d0Fp71aUfKPvhrzX6AoCRP6rc_rIEwqWsoZeRr-uqrWRm6zqP7PdonE?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/8PihCqhVPNZgyaspteya0tg5if_UzfiFSmjI7JwE9Jru9Ui6bdKmE2baYPUWAC2Xy6TlDwkOe1fkTLMCMRQerLPUBATiCVbxUwvpYQ?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/9aC-6UflX7UFEg9unOIerPstObzSDmoppXg2V6phHsi78KkrGDdioZ_im2-7SD9rqrXrGi5PpfItyRvHUKN7VTS6VJIkMhMOSfPLBhE?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/kZ6lOfyMfWLeV6XF4DaQ5IDot0b1i6brMq6SyoMUmiSWt3a1eNLhdIq8tl1FjF3tvzgOxVbhRT998RvvFijZyUFLAMPyrxQxxHbcSQ?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/tWeVD95U92BTHewJVhuJKEKGlPqhPnYreD4sPgRSyqtvLe8Al4WqNQxVVnF-LK3i24DrGg5fhBDsYXlUtV_Oww6t3kVz25bfFuvB?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/kelXuNv6UZxFH89glmV2VfV4B0lKHkf-hugpXKGVIWjB1SCfTGmQQRwbPo76jNg7HTmLah0VzsYNUFEdshdzjKDZRlxLiQH_ewSXLQ?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/lQbYb1NyP7LtpkSSQLVln5PKaiAOoNhzfflnu-7cPUMC5hIGSrVgImGkc4Ca5DzZe3lFc4KfeWVUyAkAu5urZvaKN5JILDOYGTAeNw?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/05vPImS1AbUoJlERfli5dZP1xNPJM8qf_LZdZbLKh1641WanVeTefRFH7qGh0N6Yc5RokFT0LrgU7fy0znVcjlqDupJuG_GSOAgL8gY?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://i.seadn.io/gae/Og52e2NyyPZKSzpeJMAe7sBIDAoVivIckP_bmEpb-velWeczKl0AethDYIsKEbkwu_6KQG38yWsYgqziwYDbojQcpTYosWqq6dDJWtg?auto=format&w=1000" onDragStart={handleDragStart} role="presentation" />,
];

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
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
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
  width: 500px;
  margin-right: 250px;
  margin-bottom: 200px;
`;

export const StyledBanner = styled.img`
  height: 900px;
  margin-right: 200px;
  margin-left: 200px;
  margin-top: 30px;
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
  width: 75px;
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
    // await provider.enable();
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
          <s.Container
      flex={1}
            style={{
              padding: 30,
              backgroundColor: "#F9CFCB",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
              <a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
              <s.Container style={{marginRight: "8%"}}>
              <StyledHead alt={"linkedin"} src={"/config/images/reauty-new-logo-web3-04-1@2x.png"} />
              </s.Container>
              </a>
              </s.Container>
              <s.SpacerLarge />
              <s.SpacerLarge />
              <s.SpacerLarge />
              <s.SpacerLarge />
        <s.SpacerSmall />
        <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--primary-text)"
              }}
            >
              TOXIC BAEBEE NFTS
            </s.TextTitle>
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "#01CAFF"
              }}
            >
              ________
            </s.TextTitle>
            <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 300,
              paddingRight: 300,
              borderRadius: 24,
            }}
          >
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "26px" }}
                >
                  The Beauty Industry Lacks Transparency And Regulation. Beauty Consumers Are Frustrated With Misleading Information And Exaggerated Marketing Claims.
                </s.TextTitle>
            <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "26px" }}
                >
This Deceptive Industry Which Idolizes The "Skinny And Beauty Culture," Leads Many Customers To Obtain Unnecessary Plastic Surgery, Unhealthy Eating Habits, And Unknowingly Use Beauty Products With Toxic Ingredients.
                </s.TextTitle>
            <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "26px" }}
                >
              The "Toxic Baebee" NFT Series Was Designed To Generate Public Awareness By Illustrating The "Toxic Side Of Beauty".
                </s.TextTitle>
            <s.SpacerMedium />
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
                {/* <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle> */}
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
            <s.SpacerMedium />
          </s.Container>
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
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--primary-text)"
              }}
            >
              SPECIFICATIONS
            </s.TextTitle>
            <s.SpacerMedium />
            <s.SpacerMedium />
        <ResponsiveWrapper flex={1}>
        <s.Container flex={1}>
            <StyledBanner
              alt={"example"}
              src={"/config/images/toxbbs.png"}
            />
          </s.Container>
          <s.Container
            flex={2}
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              paddingRight: 300,
              borderRadius: 24,
            }}
          >
            <s.Container flex={1}>
            <StyledSpec alt={"linkedin"} src={"/config/images/profile@2x.svg"} />
            <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "30px" }}
                >The Characters</s.TextTitle>
                <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)" }}
                >
Each Unique Baebee Is Created By A Program That Generates Over 170 Possible Traits These Include But Are Not Limited To Expression, Headwear And Clothing. Tha Majority Of Baebees Are 2d And 10 Are 3d.
                </s.TextTitle>
                </s.Container>
            <s.SpacerMedium />
            <s.Container flex={1}>
            <StyledSpec alt={"linkedin"} src={"/config/images/polygon.png"} />
            <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "30px" }}
                >ERC-721</s.TextTitle>
                <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)" }}
                >
The Baebees NFT Contract That Governs Ownership Is A Standard ERC-721 Which Is Compatible With Any Service Or Exchange, And Purchasing Baebee Costs 25 MATIC - POLYGON.
                </s.TextTitle>
                </s.Container>
            <s.SpacerMedium />
            <s.Container flex={1}>
            <StyledSpec alt={"linkedin"} src={"/config/images/utility.png"} />
            <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)", fontSize: "30px" }}
                >Specialty</s.TextTitle>
                <s.SpacerMedium />
            <s.TextTitle
                  style={{ textAlign: "left", color: "var(--primary-text)" }}
                >
              Baebees NFTs are Convertable To Reautycoin (ERC 2.0 Token). We Allow Our NFT Owner To Convert Their NFT To Our Reautycoin, Please Check The Reautycoin Page To Learn More.
                </s.TextTitle>
                </s.Container>
            <s.SpacerMedium />
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.SpacerLarge />
        <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--primary-text)"
              }}
            >
              RECENT MINTS
            </s.TextTitle>
            <s.SpacerLarge />
            <s.SpacerLarge />
            <AliceCarousel autoWidth={true} paddingLeft={350} disableButtonsControls={true} disableDotsControls={true} mouseTracking items={items} infinite={true} />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
            <s.SpacerLarge />
      <s.Container
      flex={1}
            jc={"center"}
            ai={"center"}
            style={{
              padding: 30,
              backgroundColor: "#FCB1A3",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap"
            }}>
<s.TextTitle style={{ textAlign: "left", color: "var(--primary)", fontSize: "30px", marginRight: 500 }}>© Copyright ReautyDAO 2022</s.TextTitle>
<a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)", padding: 10 }}> Document</s.TextDescription>
</a>
<a href="https://www.blingyte.com/privacy-policy" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)", padding: 10 }}> Terms Of Service</s.TextDescription>
</a>
<a href="https://reautydao.io/" style={{color: "var(--primary)"}}>
<s.TextDescription style={{ textAlign: "center", color: "var(--primary)", padding: 10 }}> Traits & Rarities</s.TextDescription>
</a>
<a href="https://www.linkedin.com/company/blingy/" style={{color: "var(--primary)"}}>
<StyledIcon style={{marginLeft: 500}} alt={"linkedin"} src={"/config/images/linkedin.png"} />
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
</s.Container>
      </s.Container>
   </s.Screen>
  );
}

export default App;

