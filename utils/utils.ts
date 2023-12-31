import axios from "axios";
import { API_KEY } from "../config/index";
export const TOKENS = require("../config/tokens.json") as any;

/**
 * Convert SrcToken Price to USD and NATIVE token price.
 * @param {string} tokenAddr tokenAddress
 * @returns {Object} {USD, NATIVE TOKEN}
 */
export async function convertPrice(tokenAddr: string): Promise<Object> {
  const tokenName = TOKENS[tokenAddr.toLowerCase()];
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${tokenName}&tsyms=USD,ETH&api_key=${API_KEY}`
  );
  return response.data;
}
