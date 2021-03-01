import pandas as pd
import csv


def write_data(df: pd.DataFrame, path: str) -> None:
    df.to_csv(path, encoding='utf-8', sep='\t', index=None, quoting=csv.QUOTE_NONE)


def dump_json(df: pd.DataFrame, path: str) -> None:
    with open(path, 'w+', encoding='utf-8') as file:
        df.to_json(file, orient='records')
