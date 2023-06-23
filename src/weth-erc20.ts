import {
  Transfer as TransferEvent,
  TransferCall,
} from "../generated/weth-erc20/erc20";
import { Transaction, Transfer } from "../generated/schema";

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

// export function handleCallTransfer(call: TransferCall): void {
//   let id = call.transaction.hash;
//   const tx = Transaction.load(id);
//   if (tx != null) return;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }
