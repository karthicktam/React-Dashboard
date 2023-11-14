const data = [
  {
    title: "data 1",
    children: [
      {
        title: "data 2",
      },
      {
        title: "data 3",
        children: [
          {
            title: "data 4",
          },
        ],
      },
    ],
  },
  {
    title: "data 5",
    children: [
      {
        title: "data 6",
      },
    ],
  },
];

const List = ({ d }) => {
  const [show, setShow] = useState(false);
  if (d?.length > 0) {
    return d?.map((elem) => <List key={elem?.title} d={elem} />);
  }
  return (
    <div style={{ marginLeft: 50 }}>
      <div>{d?.title}</div>
      {d?.children &&
        show &&
        d.children.map((d) => <List key={d?.title} d={d} />)}
      {d?.children && (
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? "hide" : "show"}
        </button>
      )}
    </div>
  );
};
