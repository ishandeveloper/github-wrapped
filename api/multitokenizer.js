require("dotenv").config();

export const multiTokenizer = async (func, params, token_no) => {
  try {
    let res = await func(params, process.env[`TOKEN_${token_no + 1}`]);

    return res.data.total_count;
  } catch (e) {
    if (token_no < process.env.TOKENS_COUNT) {
      // If there is an error, try with other tokens
      return multiTokenizer(func, params, token_no + 1);
    }

    // If exceeds the number of tokens, return 0 so that app does not crash
    return 0;
  }
};
