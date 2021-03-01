import pandas as pd

from typing import Tuple, List, TypeVar
from itertools import combinations, chain
from collections import defaultdict
from functools import lru_cache


T = TypeVar('T')


def get_cooktime_window(
    start: Tuple[int, int] = (0, 0),
    stop: Tuple[int, int] = (7, 23)
) -> List[Tuple[int, int]]:

    indices = list()
    i, j = start
    stop_i, stop_j = stop
    curr = (i, j)

    # Calculate the day steps
    for i in range(i, 7 + 1):
        # Calculate the hour steps
        for j in range(j, 23 + 1):
            curr = (i, j)
            indices.append(curr)

            if stop_i <= curr[0] and stop_j <= curr[1]:
                return indices

        j = 0  # Reset j to track all hours of next day

    return indices


# Cache the results of sorting the combo tuple to speed things up
@lru_cache
def get_sorted_items(combo: Tuple[T]) -> Tuple[T]:
    t = list(combo)
    t.sort(key=lambda x: x, reverse=True)
    return tuple(t)


def get_ngram_frequency(ngrams: List[T]):
    counter = defaultdict(int)
    for combo in ngrams:
        # Sort the combo items to ensure that counter will properly be incremented.
        # i.e. ('bacon', 'sausage', 'eggs') should increment the same counter value as
        # ('sausage', 'eggs', 'bacon') since they have the same components
        sorted_rep = get_sorted_items(combo)
        counter[sorted_rep] += 1

    return {k: v for k, v in sorted(counter.items(), key=lambda x: x[1], reverse=True)}


def gen_n_grams(n: int, o_df: pd.DataFrame) -> List[Tuple[str, str]]:
    order_item_names = [set([obj.get('name') for obj in items]) for items in o_df['items']]
    # Only keep sets of names with length bigger or equal to N
    filtered = filter(lambda x: len(x) >= n, order_item_names)
    # Make the combinations
    permutes = [list(combinations(name, n)) for name in filtered]
    # Flatten
    flat = chain.from_iterable(permutes)
    return flat


if __name__ == '__main__':
    indices = get_cooktime_window((0, 0), (0, 12))

    assert((0, 7) in indices)

    indices = get_cooktime_window((0, 0), (3, 22))

    assert((2, 23) in indices)
    assert((3, 12) in indices)
    assert((3, 23) not in indices)
    assert((0, 24) not in indices)
