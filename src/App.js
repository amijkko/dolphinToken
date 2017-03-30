import React, { Component } from 'react';

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab}          from 'material-ui/Tabs';
import TextField            from 'material-ui/TextField';
import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import {green500}           from 'material-ui/styles/colors';
import CircularProgress     from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
//import logo from './logo.svg';
import Web3  from 'web3';
import PresaleToken_json    from '../../build/contracts/PresaleToken';
import logo from './delfin-copy.png';
import './App.css';
const web3 = window.web3;
//const PresaleToken = Truffle(PresaleToken_json);
var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

export default class App extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      tokenAddress: 0xa788919642189a3d5486af0a31184730974de5ba,
      tokenMsg: 'ok',
      tokenInfo: null,
      
      defaultAccount: null,
     
      
      stepIndex: 0,
    };
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <p className="App-intro">Install <a href="https://metamask.io">MetaMask</a> and </p> ;
        
      case 1:
        return <p className="App-intro">Fund your Ethereum Address with some Ether </p>;
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  
  componentWillMount(){


  }


  render() {
    if(!window.web3) {
      return <div className="App"><NoWeb3Notification/></div>;
    }

    const spinner = (
      <CircularProgress
         size={80} thickness={5}
         style={{display: 'block', margin: '20px auto'}}
      />);
     const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    const state = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Dolphin BI Presale Page</h2>
        </div>
        <p className="App-intro">
          The crowdsale period starts on the 7th April 2017,3 PM GMT
        </p>
        <p> Presale DoBi tokens Price </p>
        <p> Presale bonus = 40% </p>
        <h3> Contract address </h3>
        <TokenAddress
            tokenAddress={state.tokenAddress}
            tokenMsg={state.tokenMsg}
          />
          <h2> How to invest </h2>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Create Wallet
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Fund Wallet
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Buy Tokens
            </StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <p>{this.getStepContent(stepIndex)}</p>
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onTouchTap={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 2}
              primary={true}
              onTouchTap={this.handleNext}
            />
          </div>
        </div>
      </div>
     
      </div>
    </MuiThemeProvider>
    );
  }
}
const TokenAddress = props => {
  const {tokenAddress, tokenMsg} = props;
  const addressStyle = {
    textAlign: 'center',
    fontSize: '20px',
    color: 'grey'
  };
  const errorStyle = props.tokenMsg && props.tokenMsg.ok
    ? { color: green500 }
    : {};

  return (
    <TextField
      hintText="Token address"
      style={{margin: '20px 0'}}
      fullWidth={true}
      disabled={false}
      inputStyle={addressStyle}
      errorStyle={errorStyle}
      errorText={tokenMsg && tokenMsg.text}
      value={'0xa788919642189a3d5486af0a31184730974de5ba'}
    />
  );
};

const NoWeb3Notification = () =>
  <div>
    <p>
      No Ethereum network provider is detected.
      There are several ways to fix this:
    </p>
    <ul>
      <li>install <a href="https://metamask.io">MetaMask</a> browser plugin</li>
      <li>install <a href="https://github.com/ethcore/parity-extension">Parity</a> browser plugin</li>
      <li>open this page in <a href="https://github.com/ethereum/mist/releases">Mist</a> browser</li>
    </ul>
    <p>
      Find more info on this project on <a href="https://github.com/sonm-io/token">github</a>.
    </p>
  </div>;