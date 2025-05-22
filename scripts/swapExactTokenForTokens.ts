import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const SHIBA_INU = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";

    const TOKEN_HOLDER = "0xf584F8728B874a6a5c7A8d4d387C9aae9172D621";

    await helpers.impersonateAccount(TOKEN_HOLDER);
    const impersonatedSigner = await ethers.getSigner(TOKEN_HOLDER);

    const amountIn = ethers.parseUnits("5", 6);
    const amountInMax = ethers.parseUnits("2", 18);

    const USDC_Contract = await ethers.getContractAt("IERC20", USDC, impersonatedSigner);
    const SHIBA_Contract = await ethers.getContractAt("IERC20", SHIBA_INU);
    
    const ROUTER = await ethers.getContractAt("IUniswapV2Router", ROUTER_ADDRESS, impersonatedSigner);

    await USDC_Contract.approve(ROUTER, amountIn);

    const usdcBal = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const shibaBal = await SHIBA_Contract.balanceOf(impersonatedSigner.address);
    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    console.log("usdc balance before swap", Number(usdcBal));
    console.log("shiba inu balance before swap", Number(shibaBal));

    await ROUTER.swapExactTokensForTokens(
        amountIn,
        amountInMax,
        [USDC, SHIBA_INU],
        impersonatedSigner.address,
        deadline
    );


    const usdcBalAfter = await USDC_Contract.balanceOf(impersonatedSigner.address);
    const shibaBalAfter = await SHIBA_Contract.balanceOf(impersonatedSigner.address);

    console.log("=========================================================");

    console.log("usdc balance after swap", Number(usdcBalAfter));
    console.log("shiba balance after swap", Number(shibaBalAfter));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
