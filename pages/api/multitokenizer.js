require("dotenv").config();

const multiTokenizer = async (func, params, token_no) => {
  try {
    const token = process.env[`TOKEN_${token_no + 1}`];
    const res = await func(params, token);
    return res;
  } catch (e) {
    if (token_no < process.env.TOKENS_COUNT) {
      // If there is an error, try with other tokens
      return multiTokenizer(func, params, token_no + 1);
    }

    // If exceeds the number of tokens, return 0 so that app does not crash
    return 0;
  }
};
module.exports = { multiTokenizer };
