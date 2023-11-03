import  React from 'react';
import { useState } from 'react';
//@ts-ignore
import { Grid, Card, Text, Col, Container, Spacer, Checkbox, Button, Row, Dropdown, Modal, Image} from "@nextui-org/react";
import { ethers } from 'ethers';
import { cipherEth, simpleCrypto, bridgeWallet } from '@/engine/configuration';
import { goeNFT, goeCustody, goeErc20, goerpc } from '@/engine/configuration'
import { bsctNFT, bsctCustody, bsctErc20, bsctrpc } from '@/engine/configuration'
import { mumNFT,polyNFT, mumCustody, mumErc20, mumrpc } from '@/engine/configuration'
/* import 'sf-font';
import 'aos/dist/aos.css'; */
import BridgeABI from '@/engine/BridgeABI.json'
import CustodyABI from '@/engine/CustodyABI.json'
import NftABI from '@/engine/NftABI.json'
import Erc20ABI from '@/engine/Erc20ABI.json'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import axios from 'axios';
import Sourcebridge from '../engine/interfaces/sourcebridge';
import Circles from '../engine/circles';
import detectEthereumProvider from '@metamask/detect-provider';
import {  createTheme,  NextUIProvider } from "@nextui-org/react";

const droptheme = createTheme({
  type: "dark",
  theme: {
    //fontFamily:'SF Pro Display',
    colors: {
      primaryLight: '#00000020',
      primaryLightHover: '#00000020',
      primaryLightActive: '#00000020',
      primaryLightContrast: '#00000020',
      primary: '#1F51FF40',
      primaryBorder: '#00000020',
      primaryBorderHover: '#00000020',
      primarySolidHover: '#00000010',
      primarySolidContrast: '$white',
      primaryShadow: '$white500',
      transparent: '#00000000',
      dropdownItemHoverTextColor:'#00000000',
      link: '#5E1DAD',

      myColor: '#00000000'

    },
    space: {},
    fonts: {}
  }
})


export default function Home() {

  const [id, getId] = useState(0);
  const [customPay, useToken] = React.useState(true);
  const [nfts, setNfts]:any = useState([]);
  const [sourceNft, getSourceNft]:any = useState([]);
  const [sourceRpc, getSourceRpc]:any = useState([]);
  const [confirmLink, getConfirmLink]:any = useState([]);
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [sourceCustody, getSourceCustody] = useState([]);
  const [erc20Contract, getErc20] = useState([]);
  const [selected, setSelected] = React.useState(new Set(["Set Destination"]));
  const destChain = React.useMemo(() => Array.from(selected).join(", ").replaceAll("_", " "),[selected])
  //@ts-ignore
  const blockImage = React.useMemo((resolve:any , reject:any )=> {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";
    if (destChain == eth) {
      return <img src="ethereumlogo.png" width={"160px"} />;
    } else if (destChain == bsc) {
      return <img src="bsc.png" width={"160px"} />;
    } else if (destChain == pol) {
      return <img src="polygonwhite.png" width={"160px"} />;
    }
  });
  //@ts-ignore
  const destImg = React.useMemo((resolve, reject) => {
    var eth = "Ethereum";
    var bsc = "Binance Smart Chain";
    var pol = "Polygon";
    if (destChain == eth) {
      return (
        <div>
          <Row css={{ marginTop: "$1" }}>
            <Text css={{ marginRight: "$2" }} h4>
              Bridge Destination:
            </Text>
            <img src="ethereumlogo.png" width={"190px"} />
          </Row>
          <Row>
            <Text css={{ marginTop: "$6", marginRight: "$2" }} h4>
              NFT ID:
            </Text>
            <Text css={{ color: "red", textShadow: "0px 0px 2px #ffffff" }} h2>
              {id}
            </Text>
          </Row>
        </div>
      );
    } else if (destChain == bsc) {
      return (
        <div>
          <Row css={{ marginTop: "$1" }}>
            <Text css={{ marginRight: "$2" }} h4>
              Bridge Destination:
            </Text>
            <img src="bsc.png" width={"190px"} />
          </Row>
          <Row>
            <Text css={{ marginTop: "$6", marginRight: "$2" }} h4>
              NFT ID:
            </Text>
            <Text css={{ color: "red", textShadow: "0px 0px 2px #ffffff" }} h2>
              {id}
            </Text>
          </Row>
        </div>
      );
    } else if (destChain == pol) {
      return (
        <div>
          <Row css={{ marginTop: "$1" }}>
            <Text css={{ marginRight: "$2" }} h4>
              Bridge Destination:
            </Text>
            <img src="polygonwhite.png" width={"190px"} />
          </Row>
          <Row>
            <Text css={{ marginTop: "$6", marginRight: "$2" }} h4>
              NFT ID:
            </Text>
            <Text css={{ color: "red", textShadow: "0px 0px 2px #ffffff" }} h2>
              {id}
            </Text>
          </Row>
        </div>
      );
    }
  });
//@ts-ignore
  const sourceImg = React.useMemo((resolve, reject) => {
    if (sourceRpc == goerpc) {
      return (
        <div>
          <Row>
            <Col>
            <Text h4>Bridge Source</Text>
              <img src="ethereumlogo.png" width={"220px"} style={{marginTop:'3px'}} />
            </Col>
            <Col css={{marginTop:'$12', paddingLeft:'$12'}}>
            <div style={{marginTop:'5px'}} id="arrowAnim">
              <div className="arrowSliding">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay1">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay2">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay3">
                <div className="arrow"></div>
              </div>
            </div>
            </Col>
          </Row>
        </div>
      );
    } else if (sourceRpc == mumrpc) {
      return (
        <div>
          <Row>
            <Col>
            <Text h4>Bridge Source</Text>
             <img src="polygonwhite.png" width={"210px"} />
             </Col>
            <Col css={{marginTop:'$12', paddingLeft:'$12'}}>
            <div style={{marginTop:'5px'}} id="arrowAnim">
              <div className="arrowSliding">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay1">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay2">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay3">
                <div className="arrow"></div>
              </div>
            </div>
            </Col>
          </Row>
        </div>
      );
    } else if (sourceRpc == bsctrpc) {
      return (
        <div>
          <Row>
            <Col>
            <Text h4>Bridge Source</Text>
             <img src="bsc.png" width={"210px"} />
             </Col>
            <Col css={{marginTop:'$12', paddingLeft:'$12'}}>
            <div style={{marginTop:'5px'}} id="arrowAnim">
              <div className="arrowSliding">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay1">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay2">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay3">
                <div className="arrow"></div>
              </div>
            </div>
            </Col>
          </Row>
        </div>
      );
    }
  });


  var account :any = null;
  var web3 = null;

  async function setSource(){
    const web3Modal = new Web3Modal();
    var providera = await web3Modal.connect();
    web3 = new Web3(providera);
    await providera.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    //@ts-ignore
    document.getElementById('wallet-address').textContent = account;
    var goe = "0x5";
    var mm = "0x13881";
    var bsct = "0x61";
    const connected = await detectEthereumProvider();
    //@ts-ignore
    if (connected.chainId == goe) {
      var sNft = goeNFT
      var sCustody = goeCustody
      var sRpc = goerpc
      var erc20 = goeErc20
    }
    //@ts-ignore
    else if (connected.chainId == mm) {
      var sNft = mumNFT
      var sCustody = mumCustody
      var sRpc = mumrpc
      var erc20 = mumErc20
    }
    //@ts-ignore
    else if (connected.chainId == bsct) {
      var sNft = bsctNFT
      var sCustody = bsctCustody
      var sRpc = bsctrpc
      var erc20 = bsctErc20
    }
    //@ts-ignore
    const provider = new ethers.providers.JsonRpcProvider(sRpc)
    const key:any = simpleCrypto.decrypt(cipherEth)
    const wallet = new ethers.Wallet(key, provider);
    //@ts-ignore
    const contract = new ethers.Contract(sNft, NftABI, wallet);
    const itemArray :any= [];
    await contract.walletOfOwner(account).then((value:any) => {
    value.forEach(async(id:any) => {
        let token = parseInt(id, 16)             
          const rawUri = contract.tokenURI(token)
          const Uri = Promise.resolve(rawUri)
          const getUri = Uri.then(value => {
            let str = value
            let cleanUri = str.replace('ipfs://', 'https://ipfs.io/ipfs/')
            let metadata = axios.get(cleanUri).catch(function (error) {
              console.log(error.toJSON());
            });
            return metadata;
          })
          getUri.then((value:any) => {
            let rawImg = value.data.image
            var name = value.data.name
            var desc = value.data.description
            let image = rawImg.replace('ipfs://', 'https://ipfs.io/ipfs/')
              let meta = {
                name: name,
                img: image,
                tokenId: token,
                wallet: account,
                desc
              }
              itemArray.push(meta)
            })
          })
          })
    await new Promise(r => setTimeout(r, 2000));
    //@ts-ignore
    console.log("Wallet Refreshed : " + sRpc)
    //@ts-ignore
    getSourceNft(sNft);
    //@ts-ignore
    getErc20(erc20);
    //@ts-ignore
    getSourceCustody(sCustody);
    //@ts-ignore
    getSourceRpc(sRpc);
    setNfts(itemArray);
  }

async function initTransfer() {
  var bsc = "Binance Smart Chain";
  var poly = "Polygon";
  var eth = "Ethereum";
  if (bsc == destChain) {
    var dCustody = bsctCustody;
    var dRpc = bsctrpc;
    var explorer = "https://testnet.bscscan.com/tx/";
    var dNFT = bsctNFT;
  } else if (poly == destChain) {
    var dCustody = mumCustody;
    var dRpc = mumrpc;
    var explorer = "https://mumbai.polygonscan.com/tx/";
    var dNFT = polyNFT;
  } else if (eth == destChain) {
    var dCustody = goeCustody;
    var dRpc = goerpc;
    var explorer:string = "https://goerli.etherscan.io/tx/";
    var dNFT = goeNFT;
  }
  const tokenId = id;
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const userWallet = await signer.getAddress();
  //@ts-ignore
  const ethprovider = new ethers.providers.JsonRpcProvider(dRpc);
  const ethKey = simpleCrypto.decrypt(cipherEth);
  //@ts-ignore
  var wallet = new ethers.Wallet(ethKey, ethprovider);
  const sNFTCol = new ethers.Contract(sourceNft, NftABI, signer);
  //@ts-ignore
  const tokenContract = new ethers.Contract(erc20Contract, Erc20ABI, signer);
  //@ts-ignore
  const ethNFTCustody = new ethers.Contract(dCustody, CustodyABI, wallet);
  //@ts-ignore
  const dNFTCont = new ethers.Contract(dNFT, BridgeABI, wallet);
  handler();
  await new Promise((r) => setTimeout(r, 1000));
  let init = 'Initializing Transfer...'
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = init
  let confirmHolder = await sNFTCol.ownerOf(tokenId);
  let bridgeHolder = await dNFTCont.ownerOf(tokenId).catch(async (error:any)=> {
    console.log('Bridge NFT not present, Standby...');
    console.log('Bridge NFT Mint at Destination Processing');
  });
  await dNFTCont.ownerOf(tokenId).catch(async (error:any) => {
    if (error) {
        const rawTxn = await dNFTCont.populateTransaction.bridgeMint(
          bridgeWallet,
          tokenId);
        let signedTxn = await wallet.sendTransaction(rawTxn);
        await signedTxn.wait();
        console.log("Bridge NFT Minted at Destination!")
        const nftBridgeApprove = await dNFTCont.approve(dCustody, tokenId);
        await nftBridgeApprove.wait();
        console.log('Transferring NFT to Destination Bridge Custody');
        let gas = { gasLimit: 3000000 };
        const retaindNFT = await ethNFTCustody.retainNew(tokenId, gas);
        await retaindNFT.wait();
        console.log('NFT Successfully Transferred to Destination Custody!');
        var hash = signedTxn.hash;
        console.log("Confirmation TX: " + hash)
        console.log('Verifications completed!, Starting Bridge Transfer...');
    }
  else if (bridgeHolder == bridgeWallet) {
      console.log('Confirming Bridge NFT at Destination Custody...');
      const nftBridgeApprove = await dNFTCont.approve(dCustody, tokenId);
        const approveConfirm = await nftBridgeApprove.wait();
        console.log(approveConfirm);
        let gas = { gasLimit: 3000000 };
        const retaindNFT = await ethNFTCustody.retainNew(tokenId, gas);
        await retaindNFT.wait();
        console.log('NFT Successfully Transferred to Destination Custody!');
        console.log('Verifications completed!, Starting Bridge Transfer...');
      }
      else {
        console.log("Error submitting transaction");
      }
    })
 if (confirmHolder == userWallet) {
    let getHolder = await ethNFTCustody.holdCustody(tokenId);
    let unListed = "0x0000000000000000000000000000000000000000";
    if (confirmHolder == getHolder.holder) {
      console.log("User Confirmed, No Updates Needed");
    } else if (getHolder.holder == unListed) {
      console.log("User Confirmed, No Updates Needed");
    } else {
      let updOwner = await ethNFTCustody.updateOwner(tokenId, userWallet);
      let receipt = await updOwner.wait();
      if (receipt) {
        console.log("Holder Address Updated to: " + userWallet);
      } else {
        console.log("Error submitting transaction");
      }
    }
 }
  let status1 = "Verifying Details..."
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = status1
  await new Promise((r) => setTimeout(r, 4000));
  let status2 = "Verified, Bridge Initialized..."
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = status2
  await new Promise((r) => setTimeout(r, 4000));
  let status3 = "Please Approve NFT Transfer to Bridge."
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = status3
  //@ts-ignore
  const sNFTCustody = new ethers.Contract(sourceCustody, CustodyABI, signer);
  const tx1 = await sNFTCol.setApprovalForAll(sourceCustody, true);
  await tx1.wait();
  console.log("Approval to Transfer NFT Received from User!");
  let status4 = "Approval Received! Processing..."
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = status4
  await new Promise((r) => setTimeout(r, 4000));
  let status5 = "Please Execute NFT Transfer to Bridge."
  if (customPay == true) {
    const cost = await sNFTCustody.costCustom();
    let options = { gasLimit: 3000000 };
    //@ts-ignore
    document.getElementById("displayconfirm1").innerHTML = status5
    const tx2 = await tokenContract.approve(sourceCustody, cost);
    await tx2.wait();
    console.log("Approval to Transfer TX Fee Payment Received!");
    const tx3 = await sNFTCustody.retainNFTC(tokenId, options);
    await tx3.wait();
  }
  else {
    const costNative = await sNFTCustody.costNative();
    let options = { gasLimit: 3000000, value: costNative };
    //@ts-ignore
    document.getElementById("displayconfirm1").innerHTML = status5
    const tx3 = await sNFTCustody.retainNFTN(tokenId, options);
    await tx3.wait();
  }
  let status6 = "NFT has been transferred to Bridge!!" 
  let status7 = "In Transit to destination..."
  //@ts-ignore
  document.getElementById("displayconfirm1").innerHTML = status6
  //@ts-ignore
  document.getElementById("displayconfirm4").innerHTML = status7
  await new Promise((r) => setTimeout(r, 4000));
  //@ts-ignore
  console.log('Transferring to Destination Via: '+ dRpc);
  let gas = { gasLimit: 3000000 };
  let rawTxn = await ethNFTCustody.populateTransaction.releaseNFT(
    tokenId,
    userWallet,
    gas
  );
  let signedTxn = await wallet.sendTransaction(rawTxn);
  let receipt = await signedTxn.wait();
  if (receipt) {
    var confirmOut6 = ''
    var confirmOut1:any = 'Transfer has been completed!'
    var confirmOut2:any = 'Click for more info: '
    //@ts-ignore
    var confirmOut4:any =  explorer + signedTxn.hash
    var confirmOut5:any = 'Transaction Info'
    await new Promise((r) => setTimeout(r, 4000));
    //@ts-ignore
    document.getElementById("displayconfirm1").innerHTML = confirmOut1
    //@ts-ignore
    document.getElementById("displayconfirm2").innerHTML = confirmOut2
    //@ts-ignore
    document.getElementById("displayconfirm3").innerHTML = confirmOut5
    //@ts-ignore
    document.getElementById("displayconfirm4").innerHTML = confirmOut6
  } else {
    console.log("Error submitting transaction");
  }
  getConfirmLink(confirmOut4);
  setSource();
}

  return (
    <div>
      <Circles />
      <Container sm={true}>
        <img
          src="nftbridge2.png"
          style={{ maxWidth: "250px", opacity: "90%", marginTop: "20px" }}
        />
        <Grid>
          <Text
            css={{
              color: "white",
              fontSize: "20px",
              margin: "30px",
              fontWeight: "200",
            }}
          >
            The n2D asset bridge is meant to do one thing, provide a transport
            mechanism to safely move Tokens and NFTs between participating
            blockchains!
          </Text>
          <p style={{ fontSize: "20px", margin: "30px", fontWeight: "200" }}>
            This is all under a single convenient dashboard. The transfer
            process is effortless and affordable.
          </p>
        </Grid>
        <Grid>
          <Col>
            <div
              id="wallet-address"
              placeholder='Select Source and Fetch Assets'
              style={{
                color: "#41EC8B",
                fontWeight: "800",
                fontSize: "16px",
                justifyContent: "center",
                marginTop: "2px",
                marginLeft: "5px",
                paddingLeft: "2px",
                marginBottom: "2px",
                display: "flex",
              }}
            >
              <label htmlFor="floatingInput">Select Source and Retrieve Assets</label>
            </div>
          </Col>
        </Grid>
      </Container>
      <Container sm={true}>
        <Card
          data-aos="slide-left"
          data-aos-duration="2200"
          data-aos-offset="100"
          /* css={{
            $$cardColor: "#00000020",
            marginBottom: "$5",
            boxShadow: "0px 2px 8px #ffffff50",
          }} */
        >
          <Text
            css={{
              color: "White",
              fontWeight: "200",
              marginLeft: "5px",
              fontSize: "18px",
              mt: "$5",
            }}
          >
            1. Transfer From
          </Text>
          <Grid css={{ ml: "$10", mr: "$10", mb: "$10" }}>
            <Sourcebridge />
            <Button
              shadow={true}
              auto={true}
              color="secondary"
              css={{
                width: "100%",
                fontFamily: "SF Pro Display",
                fontWeight: "100",
                marginTop: "$10",
                fontSize: "20px",
              }}
              onPress={setSource}
            >
              Retrieve Assets
            </Button>
          </Grid>
        </Card>
        <Card
          data-aos="slide-right"
          data-aos-duration="2200"
          data-aos-offset="100"
          css={{ $$cardColor: "#00000030", marginBottom: "$5" }}
        >
          <Text
            css={{
              color: "White",
              fontWeight: "200",
              marginLeft: "5px",
              fontSize: "18px",
              mt: "$5",
            }}
          >
            2. Select the NFT to Transfer
          </Text>
          <Grid.Container justify="flex-start" gap={2}>
            {nfts.map((nft:any, i:any) => {
              return (
                <Grid key={i}>
                  <a>
                    <Card
                      isHoverable
                      isPressable
                      id="btn"
                      key={i}
                      css={{ mw: "160px", marginRight: "$1" }}
                      variant="bordered"
                      onPress={() => getId(nft.tokenId)}
                    >
                      <Card.Image src={nft.img} />
                      <Card.Body sm={true} key={i}>
                        <h3
                          style={{
                            color: "#9D00FF",
                            fontFamily: "SF Pro Display",
                          }}
                        >
                          In Wallet
                        </h3>
                        <Text h5>
                          {nft.name} Token-{nft.tokenId}
                        </Text>
                        <Text >{nft.desc}</Text>
                      </Card.Body>
                    </Card>
                  </a>
                </Grid>
              );
            })}
          </Grid.Container>
        </Card>
        <Card
          data-aos="flip-up"
          data-aos-duration="2200"
          data-aos-offset="100"
          css={{
            $$cardColor: "#00000030",
            marginBottom: "$5",
            boxShadow: "0px 2px 8px #ffffff50",
          }}
        >
          <Text
            css={{
              color: "White",
              fontWeight: "200",
              marginLeft: "5px",
              fontSize: "18px",
              mt: "$5",
            }}
          >
            3. Transfer To:
          </Text>
          <Grid css={{ ml: "$10", mr: "$10", mb: "$10" }}>
            <NextUIProvider theme={droptheme}>
              <Text css={{ mb: "$2" }} h4>
                Destination
              </Text>
              <Dropdown>
                <Dropdown.Button
                  bordered
                  flat
                  css={{
                    borderColor: "#ffffff50",
                    borderWidth: "0.8px",
                    color: "White",
                    width: "100%",
                    minHeight: "45px",
                    borderRadius: "5px",
                  }}
                >
                  {blockImage}
                </Dropdown.Button>
                <Dropdown.Menu
                  css={{
                    opacity: "100%",
                    alignContent: "center",
                    width: "600px",
                    display: "grid",
                    backgroundColor: "#00000010",
                  }}
                  aria-label="Single selection actions"
                  /* disallowEmptySelection
                  selectionMode="single" */
                  /* selectedKeys={selected}
                  onSelectionChange={setSelected} */
                >
                  <Dropdown.Item key="Ethereum">
                    <img
                      style={{ alignContent: "center" }}
                      src="ethereumlogo.png"
                      width={"130px"}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="Binance Smart Chain"
                  >
                    <img src="bsc.png" width={"130px"} />
                  </Dropdown.Item>
                  <Dropdown.Item key="Polygon">
                    <img src="polygonwhite.png" width={"130px"} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </NextUIProvider>
          </Grid>
        </Card>
        <Card css={{ $$cardColor: "#00000042", marginBottom: "$5" }}>
          <Text
            css={{
              color: "White",
              fontWeight: "200",
              marginLeft: "5px",
              fontSize: "18px",
              mt: "$5",
            }}
          >
            4. Review Transfer Details and Confirm
          </Text>
          <Row>
            <Col css={{ marginLeft: "$15", marginTop: "$2" }}>{sourceImg}</Col>
            <Col css={{ marginLeft: "$15", marginTop: "$2" }}>{destImg}</Col>
          </Row>
          <Checkbox css={{ml:"$10"}} size="md" color="success" isSelected={customPay} onChange={useToken}>Pay with<img className='ml-3' src='n2drsmall.png' width="100px" /></Checkbox>
          <Grid lg css={{ ml: "$10", mr: "$10", mb: "$10" }}>
            <Button
              shadow
              auto
              color="secondary"
              css={{
                width: "100%",
                fontFamily: "SF Pro Display",
                fontWeight: "100",
                marginTop: "$10",
                fontSize: "20px",
              }}
              onPress={initTransfer}
            >
              Transfer
            </Button>
          </Grid>
            <Modal
            preventClose
            width="400px"
        closeButton
        animated={true}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        noPadding
        css={{backgroundColor:'#000000', 
        boxShadow:'0px 0px 15px #ffffff80',
      }}
      >
         <Image css={{position:'relative', 
         objectFit:'stretch',
         width:'400px',
         }} alt="Card image background" src="black-swirl.gif"/>
        <Modal.Header css={{ position: "absolute", zIndex: 1, }}>
        <img
          src="nftbridge2.png"
          style={{ maxWidth: "250px", opacity: "90%"}}
        />
        </Modal.Header>
        <Modal.Body css={{ position: "absolute", zIndex: 1,marginTop:'$10',marginLeft:'$10' }}>
        <Grid>
        <Row>
          <Col justify="center" align="center">
        <Text
              h4
              css={{ fontFamily: "SF Pro Display", 
              fontWeight: "600", 
              textShadow:'0px 0px 4px #ffffff60',
              marginTop:'$20'
            }}
              id="displayconfirm1"
            ></Text>
             <Text
              h4
              css={{ fontFamily: "SF Pro Display", 
              fontWeight: "200", 
            }}
              id="displayconfirm4"
            ></Text>
            <Text
              h5
              css={{ fontFamily: "SF Pro Display", 
              fontWeight: "200", 
            }}
              id="displayconfirm2"
            ></Text>
            <a href={confirmLink} target="_blank" placeholder="Transaction Info">
              <div style={{color:"#ffffff", 
              fontSize:'18px',
              textDecoration:'underline',
              fontFamily: "SF Pro Display", 
              fontWeight: "500", 
              textShadow:'0px 0px 2px #ffffff60'
              }} id="displayconfirm3"></div>
            </a>
            </Col>
            </Row>
            <Spacer></Spacer>
            <Row>
            <Col css={{marginTop:'$15'}}>
            <Button css={{fontSize:'$md', color:'white'}} size={'md'} auto flat color="error" onClick={closeHandler}>
            CLOSE
          </Button>
          </Col>
          </Row>
          </Grid>
        </Modal.Body>
      </Modal>
        </Card>
        <Spacer></Spacer>
      </Container>
    </div>
  );
  }
