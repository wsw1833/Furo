import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { lineaSepolia, linea, mainnet } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [lineaSepolia, linea, mainnet],
    connectors: [
      metaMask({
        dappMetadata: {
          name: 'Furo DApp',
          iconUrl: '',
          logging: { developerMode: true, sdk: true },
        },
      }),
    ],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [lineaSepolia.id]: http(),
      [linea.id]: http(),
      [mainnet.id]: http(),
    },
  });
}
