import { Transfer as TransferEvent } from "../generated/erc20/erc20";
import {
  AdminChanged,
  BeaconUpgraded,
  Upgraded,
  Transfer,
} from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transfer.value = event.params.value;
  transfer.implementation = event.address.toHex();
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}
