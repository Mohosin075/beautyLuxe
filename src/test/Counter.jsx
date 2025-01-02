import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../redux/features/counter/counterSlice";
import { useGetProductQuery } from "../redux/api/baseApi";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counterReducer.value);
  const { data, isLoading, error } = useGetProductQuery();

  const user  = useSelector((state)=>state.auth);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          className="my-btn"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          className="my-btn"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
