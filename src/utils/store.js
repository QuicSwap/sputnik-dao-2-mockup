import getConfig from "../config";

const readDefaultState = () => {
  try {
    let localState = JSON.parse(window.localStorage.getItem('sputnik_v2_storage'))
    /*
    let env = getConfig(urlParams.get("env") == "mainnet" ? "mainnet" : "development");
    localState.factory = env.contractName;
    localState.contract = "";
    localState.network = env;
    */
    return localState;
  } catch (err) {
    return {}
  }
}

const urlParams = new URLSearchParams(window.location.search);

const defaultState = {
  loading: false,
  config: {
    factory: getConfig(urlParams.get("env") == "mainnet" ? "mainnet" : "development").contractName,
    contract: '',
    network: getConfig(urlParams.get("env") == "mainnet" ? "mainnet" : "development"),
    filter: {
      switchAll: true,
      switchInProgress: false,
      switchDone: false,
      switchNew: false,
      switchExpired: false,
    },
    gasOptions: {
      value: "270000000000000",
      editable: false,
      minValue: 30,
      maxValue: 300,
      step: 10,
    },
    lastShownProposal: 0,
    lastJsonData: 0,
    ...readDefaultState(),
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'config': {
      return { ...state, config: action.payload }
    }
    case 'loading': {
      return { ...state, loading: action.payload }
    }
    default:
      throw new Error('mutation type not defined')
  }
}

export { reducer, defaultState }