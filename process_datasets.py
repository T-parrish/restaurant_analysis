from data_processing.dataframes import build_menu_df, build_menu_perf_df, build_order_df, build_ngram_df, gen_mappings
from data_processing.io_operations import dump_json
from data_processing.util import gen_n_grams


def main():
    time_map, price_map = gen_mappings()
    orders = build_order_df(time_map=time_map, price_map=price_map)
    menu = build_menu_df()
    performance = build_menu_perf_df(orders, menu)
    bigrams = build_ngram_df(gen_n_grams(2, orders), price_map, time_map)

    dump_json(orders, 'data_processing/clean/clean_orders.json')
    dump_json(performance, 'data_processing/clean/menu_perf.json')
    dump_json(bigrams, 'data_processing/clean/bigrams.json')


if __name__ == '__main__':
    main()
