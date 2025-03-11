const hre = require('hardhat');

async function main() {
  const petRecordSystem = await hre.ethers.getContractFactory(
    'PetRecordSystem'
  );
  const systemDeploy = await petRecordSystem.deploy('PetRecordSystem', 'Furo');
  await systemDeploy.waitForDeployment();
  console.log(`petRecordSystem deployed to:`, await systemDeploy.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
