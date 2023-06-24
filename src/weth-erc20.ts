import { Transfer as TransferEvent } from "../generated/weth-erc20/erc20";
import { arbSwapContractAddr } from "./../config/index";
import { Transfer } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  let transfer = Transfer.load(event.transaction.hash.toHex());
  if (transfer) {
    transfer.lastIndex = event.logIndex;
    transfer.lastToken = event.address.toHex();
    transfer.lastValue = event.params.value;
    transfer.save();
  } else {
    transfer = new Transfer(event.transaction.hash.toHex());
    transfer.contract = event.transaction.to;
    transfer.firstValue = event.params.value;
    transfer.firstIndex = event.logIndex;
    transfer.firstToken = event.address.toHex();
    transfer.blockNumber = event.block.number;
    transfer.blockTimestamp = event.block.timestamp;
    transfer.transactionHash = event.transaction.hash;
    transfer.save();
  }
}
