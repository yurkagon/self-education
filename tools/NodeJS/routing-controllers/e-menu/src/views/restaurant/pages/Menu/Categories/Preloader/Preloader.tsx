import React, { Fragment, FC } from "react";
import ContentLoader from "react-content-loader";

const itemHeight = 70;

const Item: FC<{}> = () => (
  <ContentLoader
    width={window.innerWidth * 0.7}
    height={itemHeight}
    style={{
      width: "100%",
      marginBottom: 18,
      paddingLeft: 19,
      paddingTop: 19,
      backgroundColor: "#fafbfd",
      borderRadius: 8,
    }}
  >
    <rect x="0" y="0" rx="5" ry="5" width="30" height="30" />
    <rect x="40" y="9" rx="4" ry="4" width="30%" height="13" />
  </ContentLoader>
);

const Preloader: FC<{}> = () => {
  const count = Math.round((window.innerHeight * 0.7) / itemHeight);

  return (
    <Fragment>
      {Array.from({ length: count }).map((_, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Item key={index} />;
      })}
    </Fragment>
  );
};

export default Preloader;
