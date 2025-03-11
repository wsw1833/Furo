import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'example-gateway.mypinata.cloud',
});

export async function uploadPetToIPFS(data) {
  const upload = await pinata.upload.public.json({
    petName: data.petName,
    ownerAddress: data.walletAddress,
    email: data.email,
    petType: data.petType,
    petBreed: data.petBreed,
    birthDay: data.birthDay,
    petImage: data.petImage,
  });

  return upload.cid;
}

export async function uploadRecordToIPFS(data) {
  const upload = await pinata.upload.public.json({
    petId: data.petId,
    petActivity: data.petActivity,
    petLocation: data.petLocation,
    providerAddress: data.walletAddress,
    petWeight: data.petWeight,
    petCondition: data.petCondition,
  });

  return upload.cid;
}
