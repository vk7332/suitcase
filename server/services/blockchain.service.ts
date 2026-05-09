import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY!,
    provider
);

export const anchorHash = async (hash: string) => {
    const tx = await wallet.sendTransaction({
        to: wallet.address, // self transaction
        value: 0,
        data: ethers.hexlify(ethers.toUtf8Bytes(hash)),
    });

    await tx.wait();

    return tx.hash;
};