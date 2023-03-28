const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
(async () => {
  const PRIVATE_KEY =
    "9a481e6992fa5835778de92212566cb5c8b0a23130d36cbf1b3d87acf8c5dc05";
  let message = {
    from: "0xe3dcf2110ca71260ddd455c9d29a84ded9d99f8fda9c35820fb91ba1a608fcdf",
    to: "0x8e093e4fe9b96645f20707fe2e610b92043919db7dcda9c6fa56bb458119490b",

    amount: 10,
  };
  console.log("Message : ", message);

  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  console.log("Hashed Message : ", messageHash);

  const [sig, recoveryBit] = await secp.sign(messageHash, PRIVATE_KEY, {
    recovered: true,
  });
  console.log("Signature : ", toHex(sig));
  console.log("Recovery Bit : ", recoveryBit);
})();
