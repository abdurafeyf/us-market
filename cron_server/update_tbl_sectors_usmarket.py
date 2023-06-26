
"""
This python file is used to update the sectors 
table of stocks so that each symbol in the 
xmarket can be
mapped to which sector it belongs.
"""
import mysql.connector
from mysql.connector import Error
import requests
import os
from dotenv import load_dotenv


load_dotenv()

urls = [
    f"https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}",
    f"https://financialmodelingprep.com/api/v3/sp500_constituent?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}",
    f"https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey={os.getenv('FINANCIAL_MODELING_PREP_KEY')}"
]


sectors_data = []
for url in urls:
    data = requests.get(url).json()
    for i in data:
        sectors_data.append(
            (
                i['symbol'],
                i['name'],
                i['sector'],
                i['subSector'],
                i['headQuarter'],
                i['dateFirstAdded'],
                i['cik'],
                i['founded']
            )
        )

try:

    connection = mysql.connector.connect(
        host=os.getenv(
            "PLANETSCALE_HOST"
            ),
        database=os.getenv(
            "PLANETSCALE_DATABASE"
            ),
        user=os.getenv(
            "PLANETSCALE_USER_NAME"
            ),
        passwd=os.getenv(
            "PLANETSCALE_PASSWORD"
            ),
        ssl_ca=os.getenv(
            "SSL_CERT"
            )
    )

    mySql_insert_query = """
    INSERT INTO tbl_sectors_usmarket (symbol, name, sector, 
    subSector, headQuarter, dateFirstAdded, cik, founded) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    mySql_delete_query = """
    DELETE FROM tbl_sectors_usmarket
    """
    mySql_remove_duplicate_query_1 = """
    CREATE TEMPORARY TABLE temp_table
    SELECT symbol
    FROM tbl_sectors_usmarket
    GROUP BY symbol
    HAVING COUNT(symbol) > 1;
    """
    mySql_remove_duplicate_query_2 = """
    DELETE FROM tbl_sectors_usmarket
    WHERE symbol IN (
        SELECT symbol
        FROM temp_table
    );
    """

    cursor = connection.cursor()

    # Delete Previous Entries
    cursor.execute(mySql_delete_query)
    connection.commit()
    print(cursor.rowcount, "records deleted successfully")

    # Add new ones
    cursor.executemany(mySql_insert_query, sectors_data)
    connection.commit()
    print(cursor.rowcount, "records inserted successfully")

    # Delete those Which are duplicate
    cursor.execute(mySql_remove_duplicate_query_1)
    connection.commit()
    print(cursor.rowcount, "records inserted to temp_table successfully")
    cursor.execute(mySql_remove_duplicate_query_2)
    connection.commit()
    print(cursor.rowcount, "records deleted successfully")
    
except Error as error:
    print("Error: {}".format(error))
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print("MySQL connection is closed")