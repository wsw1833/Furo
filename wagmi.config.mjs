import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { scrollSepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [scrollSepolia],
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
    [scrollSepolia.id]: http(),
  },
});
