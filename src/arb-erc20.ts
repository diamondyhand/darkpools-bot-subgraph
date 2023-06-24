import { Transfer as TransferEvent } from "../generated/arb-erc20/erc20";
import { Transaction, Transfer } from "../generated/schema";
import { arbSwapContractAddr } from "./../config/index";
import { ByteArray, Address } from "@graphprotocol/graph-ts";

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
