import React, { Fragment } from "react";
import ContentLoader from "react-content-loader";

const itemHeight = 70;

const Item = () => (
  <ContentLoader
    width={window.innerWidth * 0.7}
    height={itemHeight}
    style={{
      width: "100%",
      height: 150,
      marginBottom: 18,
      paddingTop: 16,
      paddingLeft: 16,
      borderRadius: 8,
      boxShadow: "0px 2px 6px rgba(133, 142, 161, 0.13)",
    }}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
    <rect x="113" y="0" rx="4" ry="4" width="70" height="21" />
    <rect x="113" y="33" rx="6" ry="6" width="40%" height="14" />
    <rect x="113" y="50" rx="6" ry="6" width="60%" height="14" />
    <rect x="113" y="67" rx="6" ry="6" width="40%" height="14" />
    <rect x="113" y="84" rx="6" ry="6" width="50%" height="14" />
    <rect x="113" y="101" rx="6" ry="6" width="60%" height="14" />
  </ContentLoader>
);

const Preloader = () => {
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
