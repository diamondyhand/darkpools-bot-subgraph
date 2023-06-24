import { Transfer as TransferEvent } from "../generated/weth-erc20/erc20";
import { arbSwapContractAddr } from "./../config/index";
import { Transfer } from "../generated/schema";
import { Address, ByteArray } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  const contractAddr = event.transaction.to as Address;
  if (!contractAddr.equals(Address.fromString(arbSwapContractAddr))) {
    return;
  }
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  transfer.value = event.params.value;
  transfer.contract = event.transaction.to;
  transfer.implementation = event.address.toHex();
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}
