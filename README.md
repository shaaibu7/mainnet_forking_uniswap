# 🦄 Uniswap Mainnet Forking Swap Scripts

This project demonstrates how to simulate token swaps on the Uniswap V2 protocol by forking the Ethereum mainnet using Hardhat. It includes two practical examples:

1. **Swapping USDC → SHIBA INU**
2. **Swapping USDC → ETH**

Using Hardhat mainnet forking and account impersonation, these scripts allow developers to test token swaps locally, without using real tokens or ETH.

---

## 🔄 Script 1: Swap USDC to SHIBA INU

**File**: `scripts/swapUsdcToShiba.ts`

### 📌 Description

This script swaps **5 USDC** for **SHIBA INU tokens** using Uniswap’s `swapExactTokensForTokens` method.

### 🧪 Key Details

- **Router Address**: `0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D` (Uniswap V2 Router)
- **USDC Token**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **SHIBA Token**: `0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE`
- **Impersonated Token Holder**: `0xf584F8728B874a6a5c7A8d4d387C9aae9172D621`

### 🚀 What It Does

- Impersonates a real USDC holder on Ethereum mainnet.
- Approves the Uniswap router to spend USDC.
- Executes a swap of exactly 5 USDC for SHIBA INU.
- Logs USDC and SHIBA balances before and after the swap.

### 💻 Run Command

```bash
npx hardhat run scripts/swapUsdcToShiba.ts
