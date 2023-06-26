# This python file is used to update the tbl_nasdaq_constituent_quote

"""
The purpose of this is to get the nasdaq quote data from the api (https://site.financialmodelingprep.com) 
and insert that data into our database.
"""

import mysql.connector
from mysql.connector import Error
import requests
import os
from dotenv import load_dotenv


load_dotenv()

quote_data = []
tickers_list = []
tickers_list_str = ''

try:
    connection = mysql.connector.connect(
        host=os.getenv("PLANETSCALE_HOST"),
        database=os.getenv("PLANETSCALE_DATABASE"),
        user=os.getenv("PLANETSCALE_USER_NAME"),
        passwd=os.getenv("PLANETSCALE_PASSWORD"),
        ssl_ca=os.getenv("SSL_CERT")
    )

    mySql_select_query = """
    SELECT symbol FROM tbl_nasdaq_constituent
    """
    cursor = connection.cursor()
    cursor.execute(mySql_select_query)
    result = cursor.fetchall()
    connection.commit()
    for x in result:
        tickers_list.append(x[0])
    tickers_list_str = ','.join(tickers_list)
except Error as error:
    print("Failed to fetch record. Error: {}".format(error))
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")


data = requests.get(f"https://financialmodelingprep.com/api/v3/quote/{tickers_list_str}?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}").json()
for quote in data:
    quote_data.append(
        (
            quote['symbol'],
            quote['name'],
            quote['price'],
            quote['changesPercentage'],
            quote['change'],
            quote['dayLow'],
            quote['dayHigh'],
            quote['yearHigh'],
            quote['yearLow'],
            quote['marketCap'],
            quote['priceAvg50'],
            quote['priceAvg200'],
            quote['exchange'],
            quote['volume'],
            quote['avgVolume'],
            quote['open'],
            quote['previousClose'],
            quote['eps'],
            quote['pe'],
            quote['earningsAnnouncement'],
            quote['sharesOutstanding'],
            quote['timestamp']
        )
    )


try:
    connection = mysql.connector.connect(
        host=os.getenv("PLANETSCALE_HOST"),
        database=os.getenv("PLANETSCALE_DATABASE"),
        user=os.getenv("PLANETSCALE_USER_NAME"),
        passwd=os.getenv("PLANETSCALE_PASSWORD"),
        ssl_ca=os.getenv("SSL_CERT")
    )

    mySql_insert_query = """
    INSERT INTO tbl_nasdaq_constituent_quote (symbol, name, price, changesPercentage, `change`, dayLow, dayHigh, yearHigh, yearLow, marketCap, priceAvg50, priceAvg200, exchange, volume, avgVolume, open, previousClose, eps, pe, earningsAnnouncement, sharesOutstanding, timestamp) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    mySql_delete_query = """
    DELETE FROM tbl_nasdaq_constituent_quote
    """
    cursor = connection.cursor()
    cursor.execute(mySql_delete_query)
    connection.commit()
    print(cursor.rowcount, "records deleted successfully")

    cursor.executemany(mySql_insert_query, quote_data)
    connection.commit()
    print(cursor.rowcount, "records inserted successfully")
except Error as error:
    print("Failed to insert record. Error: {}".format(error))
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")