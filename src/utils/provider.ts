import { AlchemyProvider, InfuraProvider, JsonRpcProvider } from '@ethersproject/providers';

import config from '@/config';

// const provider = new InfuraProvider(config.network, config.infuraKey);
const provider = new JsonRpcProvider("https://kovan3.arbitrum.io/rpc")

export default provider;

const debugProvider = new JsonRpcProvider("https://kovan3.arbitrum.io/rpc")

export { debugProvider };
