"""
The purpose of this is to get the 
nasdaq tickers name and metadata from 
the api (https://site.financialmodelingprep.com) 
and insert that data into our database.
"""
import requests
from dotenv import load_dotenv
import os
from mysql.connector import Error
import mysql.connector


load_dotenv()

tickers_url = f"https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}"

# JSON object of all tickers available
data = requests.get(tickers_url).json()
tickers_metadata = []
for ticker in data:
    tickers_metadata.append(
        (
            ticker['symbol'],
            ticker['name'],
            ticker['sector'],
            ticker['subSector'],
            ticker['headQuarter'],
            ticker['dateFirstAdded'],
            ticker['cik'],
            ticker['founded']
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
    INSERT INTO tbl_nasdaq_constituent (symbol, name, sector, subSector, headQuarter, dateFirstAdded, cik, founded)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    mySql_delete_query = """
    DELETE FROM tbl_nasdaq_constituent
    """
    cursor = connection.cursor()
    cursor.execute(mySql_delete_query)
    print(cursor.rowcount, "records deleted successfully")

    cursor.executemany(mySql_insert_query, tickers_metadata)
    print(cursor.rowcount, "records inserted successfully")
    connection.commit()

except Error as error:
    print("Some error has occured {}".format(error))

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
