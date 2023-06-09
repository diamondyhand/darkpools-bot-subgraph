import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { AdminChanged } from "../generated/schema"
import { AdminChanged as AdminChangedEvent } from "../generated/subgraph/subgraph"
import { handleAdminChanged } from "../src/subgraph"
import { createAdminChangedEvent } from "./subgraph-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let previousAdmin = Address.fromString(
      "0x12845af345b39a2b7d4c43e2f881bf91e21c5b6c"
    )
    let newAdmin = Address.fromString(
      "0xe5aa0a33ff679a1ea35d042a5e8e15b53dd40350"
    )
    let newAdminChangedEvent = createAdminChangedEvent(previousAdmin, newAdmin)
    handleAdminChanged(newAdminChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AdminChanged created and stored", () => {
    assert.entityCount("AdminChanged", 1)
    
    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    
    assert.fieldEquals(
      "AdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "previousAdmin",
      "0x12845af345b39a2b7d4c43e2f881bf91e21c5b6c"
    )
    
    assert.fieldEquals(
      "AdminChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000",
      "newAdmin",
      "0xe5aa0a33ff679a1ea35d042a5e8e15b53dd40350"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
