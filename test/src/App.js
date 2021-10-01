import react from "react";

function App() {
  const [listItem, setListItem] = react.useState("");
  const [list, setList] = react.useState([]);
  const [remainingTasks, setRemainingTasks] = react.useState(0);

  const changeHandler = (e) => {
    setListItem(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (listItem.length) {
      setList((prev) => [...prev, listItem]);
      setListItem("");
    }
  };

  const calcRemainingTasks = () => {
    const nRemainingTasks =
      list.length - document.querySelectorAll(".is-done").length;
    setRemainingTasks(nRemainingTasks);
  };
  react.useEffect(() => {
    calcRemainingTasks();
  }, [list]);

  return (
    <>
      <div>
        <h2>Todo List</h2>
      </div>

      <form onSubmit={submitHandler}>
        <input type="text" value={listItem} onChange={changeHandler}></input>
        <button type="submit">Add</button>
      </form>

      <div>{`${remainingTasks} out of ${list.length} task${
        list.length === 1 ? "" : "s"
      }`}</div>

      <ul>
        {list.map((item, index) => (
          <ItemEl
            key={index}
            item={item}
            calcRemainingTasks={calcRemainingTasks}
          />
        ))}
      </ul>
    </>
  );
}

export default App;

const ItemEl = ({ item, calcRemainingTasks }) => {
  const clickHandler = (e) => {
    e.target.classList.toggle("is-done");
    calcRemainingTasks();
  };

  return (
    <>
      <li onClick={clickHandler} className="to-do">
        {item}
      </li>
      <style>
        {`
        .is-done {
            text-decoration: line-through;
        }
      `}
      </style>
    </>
  );
};
