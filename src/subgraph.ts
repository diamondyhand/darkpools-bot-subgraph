import {
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Upgraded as UpgradedEvent,
  ArbFromETHCall,
  ArbFromETHWith1InchCall,
  ArbFromETHWith1InchAndUniV2Call,
  ArbFromETHWith1InchAndUniV3Call,
  ArbFromETHWith1InchAndVaultCall,
  ArbFromETHWithVaultCall,
  ArbFromETHWithVaultAndUniV2Call,
  ArbFromETHWithUniV3Call,
  ArbFromETHWithUniV3AndUniV2Call,
  ArbFromETHWithUniV3AndVaultCall,
} from "../generated/subgraph/subgraph";
import {
  AdminChanged,
  BeaconUpgraded,
  Transaction,
  Upgraded,
} from "../generated/schema";

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousAdmin = event.params.previousAdmin;
  entity.newAdmin = event.params.newAdmin;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.beacon = event.params.beacon;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.implementation = event.params.implementation;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

// export function handleSaveTransaction0(call: ArbFromETHCall): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction1(call: ArbFromETHWith1InchCall): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction2(
//   call: ArbFromETHWith1InchAndUniV2Call
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction3(
//   call: ArbFromETHWith1InchAndUniV3Call
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction4(
//   call: ArbFromETHWith1InchAndVaultCall
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction5(call: ArbFromETHWithUniV3Call): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction6(
//   call: ArbFromETHWithUniV3AndUniV2Call
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction7(
//   call: ArbFromETHWithUniV3AndVaultCall
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction8(call: ArbFromETHWithVaultCall): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }

// export function handleSaveTransaction9(
//   call: ArbFromETHWithVaultAndUniV2Call
// ): void {
//   let id = call.transaction.hash;
//   let transaction = new Transaction(id);
//   transaction.transactionHash = id;
//   transaction.save();
// }
