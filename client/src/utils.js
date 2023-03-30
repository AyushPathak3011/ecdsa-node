import * as secp from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";

//generate keys and address
//const privateKey = secp.utils.randomPrivateKey();
//console.log('private key: ', toHex(privateKey));

//const publicKey = secp.getPublicKey(privateKey);
//console.log('public key: ', "0x" + toHex(getAddress(publicKey)));

function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

async function signMessage(msg, privateKey) {
  return secp.sign(hashMessage(msg), privateKey, { recovered: true });
}

async function recoverAddress(message, signature, recoveryBit) {
  let publickey = await secp.recoverPublicKey(
    hashMessage(message),
    signature,
    recoveryBit
  );
  return toHex(getAddress(publickey));
}

//test recover address from signature from local
//let msg="Hello"
//let privateKey="c67fa46b0f06218933fb89d77d29210f7f0b5e7d226efb354124e5233fcfd448"
//let [signature,recoverbit] = await signMessage(msg, privateKey)
//console.log(signature,recoverbit)
//let address= await recoverAddress(msg,signature,recoverbit)
//console.log(address)

export default signMessage;
