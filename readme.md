# 🚩 DarkPools Bot Subgraph.

## **Query** 📋

> Add Trading Amount Query with the fields below (DB-211)

- Inputs: First Timestamp, Final Timestamp
- Outputs: Trading Volume USD, Trading Volume Native, Total Transactions

```js
{
  transfers (
    where: {
      contract: "0xb04dc0b5106eb9e618c80480bb1d7d9220e89a76",  // arbSwap contract
      blockTimestamp_gt: "1686373200",  // first TimeStamp
      blockTimestamp_lt: "1786093711"   // final TimeStamp
    }
  ) {
    tradingVolume
    blockTimestamp
  }
}
```

> Add Traded Tokens Query with the field below (DB-245)

- Inputs: Token Address, First, Final timestamp
- Outputs: Volume: (AmountOut + AmountIn), Volume USD, Volume Native

```js
{
  transfers(
    where: {
        contract: "0xb04dc0b5106eb9e618c80480bb1d7d9220e89a76",
        token: "0x912ce59144191c1204e64559fe8253a0e49e6548",
        blockTimestamp_gt: "1286373200",
        blockTimestamp_lt: "1786093711"
    }
  ) {
    tradingVolume
  }
}
```

> Add query Profit/Loss Query with the fields below (DB-212)

- Inputs: Token Address, First, Final timestamp, Type of Transaction
- Outputs: Profit, profit USD, profit Native

```js
{
  transfers(
    where: {
        contract: "0xb04dc0b5106eb9e618c80480bb1d7d9220e89a76",
        token: "0x912ce59144191c1204e64559fe8253a0e49e6548",
        blockTimestamp_gt: "1286373200",
        blockTimestamp_lt: "1786093711"
    }
  ) {
    profit
  }
}
```
