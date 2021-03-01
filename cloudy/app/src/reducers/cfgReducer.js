export const initialState = () => ({
  current: 'loading',
  loading: false,
  items: [],
  orders: [],
  margins: {
    top: 80,
    bottom: 80,
    left: 80,
    right: 80,
  }
})

export const reducer = (state, action) => {
  console.log('Updating State: ', state)
  console.log('Action details: ', action)

  switch (state.current) {
    case 'loading':
      switch (action.type) {
        case 'LOAD_DATA':
          return { ...state, items: action.items, orders: action.orders, current: 'idle' }
        default:
          return initialState();
      }
    case 'loaded':
      switch (action.type) {
        default:
          return initialState();
      }
    case 'idle':
      switch (action.type) {
        default:
          return initialState();
      }
  }
};
