import { Transfer as TransferEvent } from "../generated/weth-erc20/erc20";
import { arbSwapContractAddr } from "./../config/index";
import { Transfer } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  let transfer = Transfer.load(event.transaction.hash.toHex());
  if (transfer) {
    transfer.lastValue = event.params.value;
    let firstValue: BigInt | null = transfer.firstValue;
    let tradingVolume: BigInt | null = event.params.value.plus(
      firstValue ? firstValue : BigInt.fromI32(0)
    );
    let profit: BigInt | null = event.params.value.minus(
      firstValue ? firstValue : BigInt.fromI32(0)
    );

    transfer.profit = profit;
    transfer.tradingVolume = tradingVolume;
    transfer.save();
  } else {
    transfer = new Transfer(event.transaction.hash.toHex());
    transfer.contract = event.transaction.to;
    transfer.firstValue = event.params.value;
    transfer.token = event.address.toHex();
    transfer.blockNumber = event.block.number;
    transfer.blockTimestamp = event.block.timestamp;
    transfer.transactionHash = event.transaction.hash;
    transfer.profit = BigInt.fromI32(0);
    transfer.save();
  }
}
