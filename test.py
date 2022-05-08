from secp256k1 import PrivateKey, PublicKey


privkey = PrivateKey()
privkey_der = privkey.serialize()