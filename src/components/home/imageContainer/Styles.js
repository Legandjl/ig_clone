const borderStyle = "solid #dbdbdb 1px";

const Header = {
  display: "grid",
  alignContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  fontWeight: "bold",
  width: "100%",
  border: borderStyle,
  gridTemplateColumns: "auto 1fr",
  borderBottom: 0,
};

const FunctionsWrapper = {
  width: "100%",
  backgroundColor: "white",
  borderLeft: borderStyle,
  borderRight: borderStyle,
  display: "grid",
};

const FunctionsWrapperInner = {
  backgroundColor: "white",
  padding: 10,
  fontSize: "1.7em",
  display: "grid",
  gridTemplateColumns: "auto auto",

  gridGap: 5,
};

const CommentsWrapper = {
  display: "grid",
  backgroundColor: "white",

  padding: "0.6em",
};

const CommentArea = {
  border: "solid #dbdbdb 1px",
  width: "100%",
};

const ListItems = {
  wordWrap: "break-word",
};

const Styles = {
  HomePage: {
    Header: { ...Header },
    FunctionsWrapper: { ...FunctionsWrapper },
    FunctionsWrapperInner: {
      ...FunctionsWrapperInner,
      padding: 0,
      paddingLeft: 5,
      paddingTop: 10,
    },
    CommentsWrapper: { ...CommentsWrapper, padding: 0, paddingLeft: "5px" },
    CommentArea: { ...CommentArea, borderTop: "none" },
    ListItems: { ...ListItems },
  },

  ImagePage: {
    Header: { ...Header },
    FunctionsWrapper: { ...FunctionsWrapper },
    FunctionsWrapperInner: {
      ...FunctionsWrapperInner,
      borderBottom: borderStyle,
    },
    CommentsWrapper: {
      ...CommentsWrapper,
      overflowY: "scroll",
      height: "25em",
      overflowX: "hidden",
    },
    CommentArea: {
      ...CommentArea,
      display: "grid",
      gridTemplateRows: "1fr 3em",
    },
    ListItems: { ...ListItems, width: "21em" },
  },
};
export default Styles;
