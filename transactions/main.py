import requests

# get all transactions:
# transactions = requests.get('http://localhost:8033/transactions')

response = requests.get("http://api.open-notify.org/astros.json")

def main():
	print(response.json())