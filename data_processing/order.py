from typing import Dict, Union


def get_order_cook_time(raw_orders, time_map={}, price_map={}) -> int:
    '''
        Function that takes the raw orders from each step in the order dataframe items column
        along with references to a time mapping and a price mapping in order to return the 
        cook time for a particular order. (Assuming each order is cooked in parallel)

        :Param: raw_orders: Union[List[Dict[str, Union[str, int]]], List[]]
        --------
            All items from a partiucular order in one cell of the order dataframe 'items' column

        :Param: time_map: Dict[str, int]
        --------
            Reference to mapping of menu items to cook time

        :Param: price_map: Dict[str, int]
        --------
            Reference to mapping of menu items to expected prices

        :Returns: int
        --------
            Returns the max cook time for an order (when all order items are cooked in parallel)


    '''
    if len(raw_orders) == 0:
        return 0
    if len(raw_orders) == 1:
        return Order(*raw_orders, time_map, price_map).cook_time
    else:
        return max([Order(el, time_map, price_map) for el in raw_orders]).cook_time


# Class to make it easier to compare orders and find the item that takes longest to cook
class Order():
    __slots__: ["name", "paid", "quantity", "__time_map", "__price_map", "cook_time", "list_price"]

    def __init__(self,
                 data: Dict[str, Union[str, int]],
                 time_map: Dict[str, int],
                 price_map: Dict[str, int]
                 ):
        self.name = data.get('name', '')
        self.quantity = data.get('quantity', 0)
        self.paid = data.get('paid_per_unit', 0) * self.quantity
        self.__time_map = time_map
        self.__price_map = price_map
        self.cook_time = self._get_cook_time()
        self.list_price = self._get_list_price()

    @property
    def price_diff(self) -> int:
        return self.paid - self.list_price

    def __str__(self) -> str:
        return f'Name: {self.name}\nPaid: {self.paid}\nQuantity: {self.quantity}\
        \nCook Time: {self.cook_time}\nList Price {self.list_price}\nPrice Diff: {self.price_diff}'

    def __repr__(self) -> str:
        return f'Name: {self.name}\nPaid: {self.paid}\nQuantity: {self.quantity}\
                \nCook Time: {self.cook_time}\nList Price {self.list_price}\nPrice Diff: {self.price_diff}'

    def __gt__(self, other: 'Order') -> bool:
        return self.cook_time > other.cook_time

    def __lt__(self, other: 'Order') -> bool:
        return self.cook_time < other.cook_time

    def __ge__(self, other: 'Order') -> bool:
        return self.cook_time >= other.cook_time

    def __le__(self, other: 'Order') -> bool:
        return self.cook_time <= other.cook_time

    # Private method to return the cook time for a particular item and store on instance
    def _get_cook_time(self) -> int:
        return self.__time_map.get(self.name, 0)

    # Private method to return the expected price of a particular item and store on the instance
    def _get_list_price(self) -> int:
        return self.__price_map.get(self.name, 0)
