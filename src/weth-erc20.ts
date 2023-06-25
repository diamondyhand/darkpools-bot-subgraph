import { Transfer as TransferEvent } from "../generated/weth-erc20/erc20";
import { arbSwapContractAddr } from "./../config/index";
import { Transfer } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  let transfer = Transfer.load(event.transaction.hash.toHex());
  if (transfer) {
    transfer.lastToken = event.address.toHex();
    transfer.lastValue = event.params.value;
    let firstValue: BigInt | null = transfer.firstValue;
    let tradingVolume: BigInt | null = event.params.value.plus(
      firstValue ? firstValue : BigInt.fromI32(0)
    );
    let firstToken: string | null = transfer.firstToken;
    const twoTokens: string | null = firstToken
      ? firstToken.concat("-").concat(event.address.toHexString())
      : "";
    transfer.twoTokens = twoTokens;
    transfer.tradingVolume = tradingVolume;
    transfer.save();
  } else {
    transfer = new Transfer(event.transaction.hash.toHex());
    transfer.contract = event.transaction.to;
    transfer.firstValue = event.params.value;
    transfer.firstToken = event.address.toHex();
    transfer.blockNumber = event.block.number;
    transfer.blockTimestamp = event.block.timestamp;
    transfer.transactionHash = event.transaction.hash;
    transfer.twoTokens = event.address.toHex();
    transfer.save();
  }
}
