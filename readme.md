# 🚩 DarkPools Bot Subgraph.

## **Query** 📋

> Add Trading Amount Query with the fields below

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
