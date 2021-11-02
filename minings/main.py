# lets try to calculate a hash:

import requests
import json
import asyncio

from hashlib import sha256
MAX_NONCE = 1000000


async def requestBlockAndMine():
	"""Gets the block from the database and calls the mining function"""
	mine =  requests.get('http://localhost:8033/mine/romeo/0')
	# print (json.dumps(mine.json(), indent=2)) # incase I wanna print it

	jsonObject = mine.json()
	blockTimestamp = jsonObject['block']['timestamp']
	blockTransactions = jsonObject['block']['transactions']
	difficulty = jsonObject['difficulty']
	previousHash = jsonObject['block']['previousHash']
	mineB(blockTimestamp, blockTransactions, previousHash, difficulty)


def SHA256(text):
    return sha256(text.encode("ascii")).hexdigest()

def mineB(timestamp, transactions, previous_hash, prefix_zeros):
	""" Mining function that solves the puzzle and sends data to the sending function"""
	prefix_str = '0'*prefix_zeros
	new_transactions = json.dumps(transactions, separators=(',', ':'))

	for nonce in range(MAX_NONCE):
		text = timestamp +  previous_hash + new_transactions+ str(nonce)
		new_hash = SHA256(text)
		# print(new_hash)
		if new_hash.startswith(prefix_str):
			print(f"Yay! Successfully mined bitcoins with nonce value:{nonce}")
			return new_hash
		# raise BaseException(f"Couldn't find the correct solution after trying {MAX_NONCE} times")
	print("Couldn't find solution")
	exit()



asyncio.run(requestBlockAndMine())
# requestBlockAndMine()

def main():
	print("Main function of the mining section")